import { Controller } from '@nestjs/common';
import { GallatinLoggerService } from './gallatin-logger.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  GALLATIN_CREATE_TASK_TOPIC,
  GALLATIN_DELETE_TASK_TOPIC,
  GALLATIN_UPDATE_TASK_TOPIC,
} from '@app/common/payload/gallatin/constant';
import { GallatinPayload } from '@app/common/payload/gallatin/gallatin.payload';

@Controller('gallatin-logger')
export class GallatinLoggerController {
  constructor(private readonly loggerService: GallatinLoggerService) {}

  @EventPattern(GALLATIN_CREATE_TASK_TOPIC)
  logCreate(@Payload() payload: GallatinPayload) {
    this.loggerService.logCreateTask(payload);
  }

  @EventPattern(GALLATIN_UPDATE_TASK_TOPIC)
  logUpdate(@Payload() payload: GallatinPayload) {
    this.loggerService.logUpdateTask(payload);
  }

  @EventPattern(GALLATIN_DELETE_TASK_TOPIC)
  logDelete(@Payload() payload: GallatinPayload) {
    this.loggerService.logDeleteTask(payload);
  }
}
