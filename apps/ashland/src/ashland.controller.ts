import { Controller, Logger } from '@nestjs/common';
import { AshlandService } from './ashland.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AshlandController {
  private readonly logger = new Logger(AshlandController.name);
  constructor(private readonly ashlandService: AshlandService) {}

  @EventPattern('something')
  async logSomething(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log('something...', data);
  }
}
