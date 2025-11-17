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
      const authResult = await this.workosService.authenticateSession(session);

      // Attach user and session info to request for use in controllers
      request['user'] = authResult.user;
      request['sessionData'] = {
        authenticated: true,
        sessionId: authResult.sessionId,
        organizationId: authResult.organizationId,
        role: authResult.role,
        permissions: authResult.permissions,
        entitlements: authResult.entitlements,
        impersonator: authResult.impersonator,
      };

      return true;
    } catch (error) {
      // Clear invalid session cookie
      this.workosService.clearSessionCookie(response);

      throw new UnauthorizedException('Authentication required');
    }
  }
}
