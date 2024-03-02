import { Injectable, Logger } from '@nestjs/common';
import { GallatinPayload } from '@app/common/payload/gallatin/gallatin.payload';

@Injectable()
export class GallatinLoggerService {
  private readonly logger = new Logger(GallatinLoggerService.name);

  logCreateTask(task: GallatinPayload) {
    this.logger.log(`Task Created: ${JSON.stringify(task)}`);
  }

  logUpdateTask(task: GallatinPayload) {
    this.logger.log(`Task Updated: ${JSON.stringify(task)}`);
  }

  logDeleteTask(task: GallatinPayload) {
    this.logger.log(`Task Deleted: ${JSON.stringify(task)}`);
  }
}
