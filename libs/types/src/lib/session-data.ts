import { type AuthenticateWithSessionCookieSuccessResponse } from '@workos-inc/node';

export type SessionData = Omit<
  AuthenticateWithSessionCookieSuccessResponse,
  'user' | 'accessToken'
>;
