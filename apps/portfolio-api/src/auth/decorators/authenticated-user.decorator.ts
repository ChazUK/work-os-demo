import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@workos-inc/node';

/**
 * Decorator to extract the current authenticated user from the request
 * Must be used with AuthGuard
 *
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(AuthGuard)
 * getProfile(@GetAuthenticatedUser() user: User) {
 *   return user;
 * }
 * ```
 */
export const GetAuthenticatedUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
