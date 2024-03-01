import { Module } from '@nestjs/common';
import { GallatinController } from './gallatin.controller';
import { GallatinService } from './gallatin.service';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/gallatin/.env',
    }),
    TasksModule,
  ],
  controllers: [GallatinController],
  providers: [GallatinService],
})
export class GallatinModule {}
