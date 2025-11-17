import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { type SessionData } from '@work-os-demo/types';
import { User } from '@workos-inc/node';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { GetAuthenticatedUser } from './decorators/authenticated-user.decorator';
import { GetSessionData } from './decorators/session-data.decorator';
import { SESSION_COOKIE_NAME, WorkOSService } from './workos.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private workosService: WorkOSService) {}

  /**
   * Initiate login flow
   * Returns authorization URL to WorkOS AuthKit
   *
   * @param state - Optional state parameter to preserve application state
   */
  @Get('login')
  login(@Query('state') state: string, @Res() res: Response) {
    try {
      const authorizationUrl = this.workosService.getAuthorizationUrl(state);
      this.logger.log('Generating authorization URL to WorkOS AuthKit');

      return res.json({ authorizationUrl });
    } catch (error) {
      this.logger.error('Failed to initiate login', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to initiate login',
      });
    }
  }

  /**
   * OAuth callback endpoint
   * Exchanges authorization code for session
   * Sets secure session cookie and returns user and redirect URL
   *
   * @param code - Authorization code from WorkOS
   * @param state - Optional state parameter returned from WorkOS
   */
  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    if (!code) {
      this.logger.error('No authorization code provided');

      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'No authorization code provided',
      });
    }

    try {
      // Exchange code for authenticated session
      const { user, sealedSession } =
        await this.workosService.authenticateWithCode(code);

      // Set secure session cookie
      this.workosService.setSessionCookie(res, sealedSession);

      this.logger.log(`User authenticated: ${user.id}`);

      // Return user and redirect URL
      const redirectUrl = state
        ? `${process.env.FRONTEND_URL}${state}`
        : process.env.FRONTEND_URL;

      return res.json({ user, redirectUrl });
    } catch (error) {
      this.logger.error('Authentication callback failed', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Authentication callback failed',
      });
    }
  }

  /**
   * Get current authenticated user
   * Protected endpoint - requires valid session
   */
  @Get('user')
  @UseGuards(AuthGuard)
  getUser(@GetAuthenticatedUser() user: User) {
    return { user };
  }

  /**
   * Check session authentication status
   * Returns user info if authenticated, 401 if not
   */
  @Get('session')
  @UseGuards(AuthGuard)
  getSession(@GetSessionData() session: SessionData) {
    this.logger.log(`Session: ${JSON.stringify(session)}`);
    return {
      session,
    };
  }

  /**
   * Refresh session using refresh token
   * Updates session cookie with new sealed session
   *
   * @param refreshToken - Refresh token from client
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    try {
      // Try to get refresh token from request body or cookie
      const refreshToken =
        req.body?.refreshToken || req.cookies['refresh_token'];

      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }

      // Refresh session with WorkOS
      const {
        user,
        sealedSession,
        refreshToken: newRefreshToken,
      } = await this.workosService.refreshSessionWithToken(refreshToken);

      // Update session cookie
      this.workosService.setSessionCookie(res, sealedSession);

      this.logger.log(`Session refreshed for user: ${user.id}`);

      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        refreshToken: newRefreshToken, // Return new refresh token for client to store
      });
    } catch (error) {
      this.logger.error('Session refresh failed', error);

      // Clear invalid session
      this.workosService.clearSessionCookie(res);

      return res.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Session refresh failed',
      });
    }
  }

  /**
   * Logout endpoint
   * Clears session cookie and returns logout URL to frontend
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      // Get session to extract sessionId
      const sessionData = req.cookies[SESSION_COOKIE_NAME];

      if (sessionData) {
        const session = this.workosService.loadSealedSession(sessionData);
        const authResult = await this.workosService.authenticateSession(
          session,
        );

        // Clear session cookie
        this.workosService.clearSessionCookie(res);

        // Get WorkOS logout URL
        const logoutUrl = this.workosService.getLogoutUrl(authResult.sessionId);

        this.logger.log(`User logged out: ${authResult.user.id}`);

        return res.json({
          success: true,
          logoutUrl, // Frontend should redirect to this URL
        });
      }

      // No session found, just clear cookie
      this.workosService.clearSessionCookie(res);

      return res.json({
        success: true,
        message: 'No active session',
      });
    } catch (error) {
      this.logger.error('Logout failed', error);

      // Clear cookie anyway
      this.workosService.clearSessionCookie(res);

      return res.json({
        success: true,
        message: 'Logged out',
      });
    }
  }

  /**
   * Health check endpoint to verify auth service is running
   */
  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'auth',
      timestamp: new Date().toISOString(),
    };
  }
}
