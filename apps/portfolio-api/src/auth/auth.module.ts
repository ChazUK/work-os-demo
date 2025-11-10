import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { WorkOSService } from './workos.service';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [WorkOSService, AuthGuard],
  exports: [WorkOSService, AuthGuard],
})
export class AuthModule {}
