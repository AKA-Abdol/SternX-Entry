import { NestFactory } from '@nestjs/core';
import { GallatinModule } from './gallatin.module';

async function bootstrap() {
  const app = await NestFactory.create(GallatinModule);
  await app.listen(3000);
}
bootstrap();
