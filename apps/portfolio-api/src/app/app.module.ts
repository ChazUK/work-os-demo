import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ExampleProtectedController } from './example-protected.controller';

@Module({
  imports: [AuthModule],
  controllers: [ExampleProtectedController],
  providers: [],
})
export class AppModule {}
