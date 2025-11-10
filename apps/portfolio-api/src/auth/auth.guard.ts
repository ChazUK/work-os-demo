import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { WorkOSService } from './workos.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private workosService: WorkOSService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['wos-session'];

    if (!cookie)
      throw new UnauthorizedException('No session found');

    const session = await this.workosService.loadSealedSession(cookie);

    if (!session)
      throw new UnauthorizedException('Invalid session');

    // Check if session is expired
    if (new Date() < new Date()) {



      try {
       await session.refresh();

        return true;
      } catch (error) {
        throw new UnauthorizedException('Session expired');
      }
    }

    // request.user = session.user;
    return true;
  }
}
