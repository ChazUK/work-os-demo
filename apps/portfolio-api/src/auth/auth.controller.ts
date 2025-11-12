import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { WorkOSService } from './workos.service';

@Controller('auth')
export class AuthController {
  constructor(private workosService: WorkOSService) {}

  @Get('login')
  login(@Res() res: Response, @Query('state') state?: string) {
    const authorizationUrl = this.workosService.getAuthorizationUrl(state);

    return res.redirect(authorizationUrl);
  }

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const { sealedSession } = await this.workosService.authenticateWithCode(
        code,
      );

      res.cookie('wos-session', sealedSession, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.redirect('http://portfolio-web.test/dashboard');
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: Request) {
    const sealedSession = req.cookies['wos-session'];

    if (!sealedSession) throw new UnauthorizedException('No session');

    try {
      const session = await this.workosService.loadSealedSession(sealedSession);

      const authResponse = await session.authenticate();

      if (!authResponse.authenticated)
        throw new UnauthorizedException('Session not authenticated');

      return { user: authResponse.user };
    } catch (error) {
      throw new UnauthorizedException('Invalid session');
    }
  }

  @Get('logout')
  async logout(@Res() res: Response, @Req() req: Request) {
    const session = this.workosService.loadSealedSession(
      req.cookies['wos-session'],
    );

    console.log(req.cookies['wos-session']);

    if (!session) throw new UnauthorizedException('No session');

    const url = await session.getLogoutUrl();

    console.log({ url });
    res.clearCookie('wos-session');

    return res.redirect(url);
  }
}
