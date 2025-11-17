import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type SessionData } from '@work-os-demo/types';

export const GetSessionData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): SessionData => {
    const request = ctx.switchToHttp().getRequest();

    return request.sessionData;
  },
);
