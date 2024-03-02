import { NestFactory } from '@nestjs/core';
import { AshlandModule } from './ashland.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AshlandModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'gallatin_queue',
      },
    },
  );
  await app.listen();
}
bootstrap();
