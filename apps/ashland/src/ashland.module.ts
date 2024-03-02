import { Module } from '@nestjs/common';
import { GallatinLoggerModule } from './gallatin-logger/gallatin-logger.module';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_GALLATIN_LOGGER_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/ashland/.env',
    }),
    GallatinLoggerModule,
    RmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AshlandModule {}
