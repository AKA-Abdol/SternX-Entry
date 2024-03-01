import { Controller, Get } from '@nestjs/common';
import { AshlandService } from './ashland.service';

@Controller()
export class AshlandController {
  constructor(private readonly ashlandService: AshlandService) {}

  @Get()
  getHello(): string {
    return this.ashlandService.getHello();
  }
}
