import { NestFactory } from '@nestjs/core';
import { AshlandModule } from './ashland.module';
import { RmqService } from '@app/common';
import { GALLATIN_LOGGER_QUEUE } from '@app/common/payload/gallatin/constant';

async function bootstrap() {
  const app = await NestFactory.create(AshlandModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(GALLATIN_LOGGER_QUEUE, true));
  await app.startAllMicroservices();
}
bootstrap();
