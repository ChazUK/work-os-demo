import { Injectable } from '@nestjs/common';
import { WorkOS } from '@workos-inc/node';

@Injectable()
export class WorkOSService {
  private clientId: string;
  private workos: WorkOS;

  constructor() {
    this.clientId = process.env.WORKOS_CLIENT_ID;
    this.workos = new WorkOS(process.env.WORKOS_API_KEY, { clientId: this.clientId });
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
      }
    });
  }

  async getUser(accessToken: string) {
    return await this.workos.userManagement.getUser(accessToken);
  }

  async refreshToken(refreshToken: string) {
    return await this.workos.userManagement.authenticateWithRefreshToken({
      refreshToken,
      clientId: this.clientId,
    });
  }

  getLogoutUrl() {
    return this.workos.userManagement.getLogoutUrl({
      sessionId: 'session_id', // This will be replaced with actual session ID
    });
  }

  async loadSealedSession(sessionData: string) {
    return await this.workos.userManagement.loadSealedSession({
      sessionData,
      cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });
  }
}
