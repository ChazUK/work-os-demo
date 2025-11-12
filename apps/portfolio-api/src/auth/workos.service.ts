import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WorkOS } from '@workos-inc/node';
import { CookieSession } from '@workos-inc/node/lib/user-management/session';

@Injectable()
export class WorkOSService {
  private clientId: string;
  private workos: WorkOS;

  constructor() {
    this.clientId = process.env.WORKOS_CLIENT_ID;
    this.workos = new WorkOS(process.env.WORKOS_API_KEY, {
      clientId: this.clientId,
    });
  }

  getAuthorizationUrl(state?: string) {
    return this.workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      redirectUri: process.env.WORKOS_REDIRECT_URI,
      clientId: this.clientId,
      state,
    });
  }

  async authenticateWithCode(code: string) {
    return await this.workos.userManagement.authenticateWithCode({
      clientId: this.clientId,
      code,
      session: {
        sealSession: true,
        cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
      },
    });
  }

  async getUser(session: CookieSession) {
    const authResponse = await session.authenticate();

    if (!authResponse.authenticated)
      throw new UnauthorizedException('Session not authenticated');

    return authResponse.user;
  }

  loadSealedSession(sessionData: string) {
    return this.workos.userManagement.loadSealedSession({
      sessionData,
      cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });
  }
}
