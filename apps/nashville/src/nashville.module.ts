import { Module } from '@nestjs/common';
import { NashvilleController } from './nashville.controller';
import { NashvilleService } from './nashville.service';

@Module({
  imports: [],
  controllers: [NashvilleController],
  providers: [NashvilleService],
})
export class NashvilleModule {}
