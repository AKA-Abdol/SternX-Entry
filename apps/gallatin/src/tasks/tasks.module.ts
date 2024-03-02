import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './tasks.schema';
import { TasksRepository } from './tasks.repo';
import { TasksSeeder } from './tasks.seeder';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ClientsModule.register([
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'gallatin_queue',
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, TasksSeeder],
})
export class TasksModule {}
