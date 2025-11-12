import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WorkOSService } from './workos.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private workosService: WorkOSService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['wos-session'];

    if (!cookie) throw new UnauthorizedException('No session found');

    const session = await this.workosService.loadSealedSession(cookie);

    if (!session) throw new UnauthorizedException('Invalid session');

    const authResponse = await session.authenticate();

    if (!authResponse.authenticated)
      throw new UnauthorizedException('Session not authenticated');

    request.user = authResponse.user;
    return true;
  }
}
