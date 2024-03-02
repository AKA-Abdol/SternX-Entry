import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './tasks.schema';
import { TasksRepository } from './tasks.repo';
import { TasksSeeder } from './tasks.seeder';
import { RmqModule } from '@app/common';
import { GALLATIN_LOGGER_QUEUE } from '@app/common/payload/gallatin/constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    RmqModule.register(GALLATIN_LOGGER_QUEUE),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, TasksSeeder],
})
export class TasksModule {}
