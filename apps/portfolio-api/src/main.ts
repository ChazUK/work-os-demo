import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
  });

  // app.use(cookieParser(process.env.WORKOS_COOKIE_PASSWORD));

  const port = process.env.PORT || 4201;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
