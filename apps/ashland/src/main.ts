import { NestFactory } from '@nestjs/core';
import { AshlandModule } from './ashland.module';

async function bootstrap() {
  const app = await NestFactory.create(AshlandModule);
  await app.listen(3000);
}
bootstrap();
