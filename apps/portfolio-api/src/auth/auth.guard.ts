import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SESSION_COOKIE_NAME, WorkOSService } from './workos.service';

/**
 * Authentication guard to protect routes
 * Validates session and automatically refreshes if needed
 * Attaches authenticated user to request object
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private workosService: WorkOSService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      // Get session cookie
      const sessionData = request.cookies[SESSION_COOKIE_NAME];

      if (!sessionData) {
        this.logger.warn('No session cookie found');

        throw new UnauthorizedException('No active session');
      }

      // Load and authenticate session
      const session = this.workosService.loadSealedSession(sessionData);
      const authResponse = await session.authenticate();

      if (!authResponse.authenticated) {
        try {
          // Attempt to refresh the session when it is invalid or expired
          const refreshResponse = await session.refresh();

          if (!refreshResponse.authenticated) {
            this.logger.warn('Session refresh failed: still unauthenticated');

            throw new UnauthorizedException('Authentication required');
          }

          // Update session cookie with refreshed sealed session
          this.workosService.setSessionCookie(
            response,
            refreshResponse.sealedSession,
          );

          // Re-authenticate with refreshed session to get user and claims
          const refreshedAuthResponse = await session.authenticate();

          if (!refreshedAuthResponse.authenticated) {
            this.logger.warn('Re-authentication after refresh failed');

            throw new UnauthorizedException('Authentication required');
          }

          // Attach user and session info to request for use in controllers
          request['user'] = refreshedAuthResponse.user;
          request['sessionData'] = {
            authenticated: true,
            sessionId: refreshedAuthResponse.sessionId,
            organizationId: refreshedAuthResponse.organizationId,
            role: refreshedAuthResponse.role,
            permissions: refreshedAuthResponse.permissions,
            entitlements: refreshedAuthResponse.entitlements,
            impersonator: refreshedAuthResponse.impersonator,
          };

          return true;
        } catch (error) {
          this.logger.error('Session refresh failed', error);

          throw new UnauthorizedException('Authentication required');
        }
      }

      // Attach user and session info to request for use in controllers
      request['user'] = authResponse.user;
      request['sessionData'] = {
        authenticated: true,
        sessionId: authResponse.sessionId,
        organizationId: authResponse.organizationId,
        role: authResponse.role,
        permissions: authResponse.permissions,
        entitlements: authResponse.entitlements,
        impersonator: authResponse.impersonator,
      };

      return true;
    } catch (error) {
      // Clear invalid session cookie
      this.workosService.clearSessionCookie(response);

      throw new UnauthorizedException('Authentication required');
    }
  }
}
