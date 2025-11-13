import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticateWithSessionCookieSuccessResponse } from '@workos-inc/node';

export type SessionData = Omit<
  AuthenticateWithSessionCookieSuccessResponse,
  'user'
>;

export const GetSessionData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): SessionData => {
    const request = ctx.switchToHttp().getRequest();

    return request.sessionData;
  },
);
