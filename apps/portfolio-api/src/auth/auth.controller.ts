import { Controller } from '@nestjs/common';
import { WorkOSService } from './workos.service';

@Controller('auth')
export class AuthController {
  constructor(private workosService: WorkOSService) {}
}
