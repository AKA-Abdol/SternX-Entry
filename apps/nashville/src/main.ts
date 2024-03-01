import { NestFactory } from '@nestjs/core';
import { NashvilleModule } from './nashville.module';

async function bootstrap() {
  const app = await NestFactory.create(NashvilleModule);
  await app.listen(3000);
}
bootstrap();
