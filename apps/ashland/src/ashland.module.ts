import { Module } from '@nestjs/common';
import { AshlandController } from './ashland.controller';
import { AshlandService } from './ashland.service';

@Module({
  imports: [],
  controllers: [AshlandController],
  providers: [AshlandService],
})
export class AshlandModule {}
