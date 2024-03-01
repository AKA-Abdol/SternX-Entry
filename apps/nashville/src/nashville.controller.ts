import { Controller, Get } from '@nestjs/common';
import { NashvilleService } from './nashville.service';

@Controller()
export class NashvilleController {
  constructor(private readonly nashvilleService: NashvilleService) {}

  @Get()
  getHello(): string {
    return this.nashvilleService.getHello();
  }
}
