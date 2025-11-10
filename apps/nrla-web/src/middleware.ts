import { authkit } from '@workos-inc/authkit-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  // Perform logic before or after AuthKit

  // Auth object contains the session, response headers and an authorization
  // URL in the case that the session isn't valid. This method will automatically
  // handle setting the cookie and refreshing the session
  const {
    session,
    headers: authkitHeaders,
    authorizationUrl,
  } = await authkit(request, {
    debug: true,
  });
  const { pathname } = new URL(request.url);

  // Control of what to do when there's no session on a protected route
  // is left to the developer
  if (pathname.startsWith('/account') && !session.user) {
    console.log('No session on protected path');

    // Preserve AuthKit headers on redirects (e.g., cookies)
    const response = NextResponse.redirect(authorizationUrl as string);

    for (const [key, value] of authkitHeaders) {
      if (key.toLowerCase() === 'set-cookie') {
        response.headers.append(key, value);
      } else {
        response.headers.set(key, value);
      }
    }

    return response;
  }

  // Forward the incoming request headers and then add AuthKit's headers
  const response = NextResponse.next({
    request: { headers: new Headers(request.headers) },
  });

  for (const [key, value] of authkitHeaders) {
    if (key.toLowerCase() === 'set-cookie') {
      response.headers.append(key, value);
    } else {
      response.headers.set(key, value);
    }
  }

  return response;
}

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = { };
