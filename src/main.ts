import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //white list means filter out values that are not part of the intended field
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  //passing the token to the client as a cookie
  app.use(cookieParser());
  
  await app.listen(4000);
}
bootstrap();
