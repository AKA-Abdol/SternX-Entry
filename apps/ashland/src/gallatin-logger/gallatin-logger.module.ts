import { Module } from '@nestjs/common';
import { GallatinLoggerController } from './gallatin-logger.controller';
import { GallatinLoggerService } from './gallatin-logger.service';

@Module({
  controllers: [GallatinLoggerController],
  providers: [GallatinLoggerService],
})
export class GallatinLoggerModule {}
