import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@workos-inc/node';

export const GetAuthenticatedUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
