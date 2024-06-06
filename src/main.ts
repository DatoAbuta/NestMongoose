import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SafeGuard } from './users/users.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new SafeGuard());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
