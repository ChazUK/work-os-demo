import {
  Controller,
  Get,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { WorkOSService } from './workos.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private workosService: WorkOSService) {}

  @Get('login')
  login(
    @Res() res: Response,
    @Query('state') state?: string,
  ) {
    const authorizationUrl = this.workosService.getAuthorizationUrl(state);

    return res.json({ url: authorizationUrl });
  }

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    try {
      const { user, sealedSession } =
        await this.workosService.authenticateWithCode(code);

      res.cookie('wos-session', sealedSession, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({ user });
    } catch (error) {
      console.error(error);

      return res.status(401).json({ error: 'Authentication failed' });
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getUser(@Req() req: Request) {
    return req['user'];
  }

  @Get('logout')
  async logout(@Res() res: Response, @Req() req: Request) {

    const session = await this.workosService.loadSealedSession(req.cookies['wos-session']);
    const url = await session.getLogoutUrl();

    res.clearCookie('wos-session');

    return res.redirect(url);
  }
}
