import { Controller, Get, UseGuards } from '@nestjs/common';
import { type SessionData } from '@work-os-demo/types';
import { User } from '@workos-inc/node';
import { AuthGuard, GetAuthenticatedUser, GetSessionData } from '../auth';

/**
 * Example controller demonstrating how to protect routes
 * and access authenticated user data
 */
@Controller('api')
export class ExampleProtectedController {
  /**
   * Public endpoint - no authentication required
   */
  @Get('public')
  getPublicData() {
    return {
      message: 'This is public data',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Protected endpoint - requires authentication
   * Uses AuthGuard to validate session
   */
  @Get('protected')
  @UseGuards(AuthGuard)
  getProtectedData(@GetAuthenticatedUser() user: User) {
    return {
      message: 'This is protected data',
      user,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Protected endpoint with full session data
   * Demonstrates accessing permissions and roles
   */
  @Get('admin')
  @UseGuards(AuthGuard)
  getAdminData(
    @GetAuthenticatedUser() user: User,
    @GetSessionData() session: SessionData,
  ) {
    return {
      message: 'This is admin data',
      user,
      session,
      timestamp: new Date().toISOString(),
    };
  }
}
