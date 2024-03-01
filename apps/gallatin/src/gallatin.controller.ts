import { Controller, Get } from '@nestjs/common';
import { GallatinService } from './gallatin.service';

@Controller()
export class GallatinController {
  constructor(private readonly gallatinService: GallatinService) {}

  @Get()
  getHello(): string {
    return this.gallatinService.getHello();
  }
}
