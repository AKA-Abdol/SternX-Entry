import { NestFactory } from '@nestjs/core';
import { GallatinModule } from './gallatin.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GallatinModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'gallatin',
        protoPath: join(__dirname, 'proto/gallatin.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
