import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { WorkOS } from '@workos-inc/node';
import { CookieSession } from '@workos-inc/node/lib/user-management/session';
import { Response } from 'express';

export const SESSION_COOKIE_NAME = 'wos-session' as const;

@Injectable()
export class WorkOSService {
  private readonly logger = new Logger(WorkOSService.name);
  private clientId: string;
  private workos: WorkOS;
  private cookiePassword: string;
  private isProduction = process.env.NODE_ENV === 'production';

  constructor() {
    this.clientId = process.env.WORKOS_CLIENT_ID;
    this.cookiePassword = process.env.WORKOS_COOKIE_PASSWORD;

    if (!this.clientId)
      throw new Error('Missing required WorkOS Client ID environment variable');

    if (!this.cookiePassword)
      throw new Error(
        'Missing required WorkOS Cookie Password environment variable',
      );

    if (!process.env.WORKOS_API_KEY)
      throw new Error('Missing required WorkOS API Key environment variable');

    this.workos = new WorkOS(process.env.WORKOS_API_KEY, {
      clientId: this.clientId,
    });
  }

  /**
   * Generate authorization URL for WorkOS AuthKit
   */
  getAuthorizationUrl(state?: string): string {
    return this.workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      redirectUri: process.env.WORKOS_REDIRECT_URI,
      clientId: this.clientId,
      state,
    });
  }

  /**
   * Exchange authorization code for authenticated session
   */
  async authenticateWithCode(code: string) {
    try {
      return await this.workos.userManagement.authenticateWithCode({
        clientId: this.clientId,
        code,
        session: {
          sealSession: true,
          cookiePassword: this.cookiePassword,
        },
      });
    } catch (error) {
      this.logger.error('Failed to authenticate with code', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  /**
   * Exchange email and password for authenticated session
   */
  async authenticateWithPassword(email: string, password: string) {
    try {
      return await this.workos.userManagement.authenticateWithPassword({
        clientId: this.clientId,
        email,
        password,
        session: {
          sealSession: true,
          cookiePassword: this.cookiePassword,
        },
      });
    } catch (error) {
      this.logger.error('Failed to authenticate with password', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  /**
   * Load sealed session from cookie data
   */
  loadSealedSession(sessionData: string): CookieSession {
    return this.workos.userManagement.loadSealedSession({
      sessionData,
      cookiePassword: this.cookiePassword,
    });
  }

  /**
   * Authenticate session and return user if valid
   * Automatically refreshes session if needed
   */
  async authenticateSession(session: CookieSession) {
    try {
      const authResponse = await session.authenticate();

      if (!authResponse.authenticated)
        throw new UnauthorizedException('Session not authenticated');

      return {
        user: authResponse.user,
        sessionId: authResponse.sessionId,
        organizationId: authResponse.organizationId,
        role: authResponse.role,
        permissions: authResponse.permissions,
        entitlements: authResponse.entitlements,
        impersonator: authResponse.impersonator,
      };
    } catch (error) {
      this.logger.error('Session authentication failed', error);
      throw new UnauthorizedException('Invalid or expired session');
    }
  }

  /**
   * Refresh session using refresh token
   * Returns new sealed session and authentication response
   */
  async refreshSessionWithToken(refreshToken: string) {
    try {
      const result =
        await this.workos.userManagement.authenticateWithRefreshToken({
          clientId: this.clientId,
          refreshToken,
          session: {
            sealSession: true,
            cookiePassword: this.cookiePassword,
          },
        });

      return result;
    } catch (error) {
      this.logger.error('Failed to refresh session with token', error);
      throw new UnauthorizedException('Session refresh failed');
    }
  }

  /**
   * Get logout URL
   */
  getLogoutUrl(sessionId: string): string {
    return this.workos.userManagement.getLogoutUrl({
      sessionId,
      returnTo: process.env.FRONTEND_URL,
    });
  }

  /**
   * Set secure session cookie
   */
  setSessionCookie(res: Response, sealedSession: string): void {
    res.cookie(SESSION_COOKIE_NAME, sealedSession, {
      httpOnly: true,
      secure: this.isProduction, // HTTPS only in production
      sameSite: this.isProduction ? 'none' : 'lax', // 'none' for cross-domain in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
      domain: this.isProduction ? '.test' : undefined, // Share across subdomains in production
    });
  }

  /**
   * Clear session cookie
   */
  clearSessionCookie(res: Response): void {
    res.clearCookie(SESSION_COOKIE_NAME, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'none' : 'lax',
      path: '/',
    });
  }
}
