import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}

bootstrap();
