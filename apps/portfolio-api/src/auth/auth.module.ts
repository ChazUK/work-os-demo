import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { WorkOSService } from './workos.service';

@Module({
  controllers: [AuthController],
  providers: [WorkOSService],
  exports: [WorkOSService],
})
export class AuthModule {}
