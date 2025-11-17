import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PropertiesModule } from '../properties/properties.module';
import { ExampleProtectedController } from './example-protected.controller';

@Module({
  imports: [AuthModule, PropertiesModule],
  controllers: [ExampleProtectedController],
  providers: [],
})
export class AppModule {}
