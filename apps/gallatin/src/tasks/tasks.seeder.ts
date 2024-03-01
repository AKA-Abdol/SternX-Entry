import { Seeder } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ICreateTask } from './interfaces/create-task.interface';
import { Task } from './tasks.schema';
import mongoose, { Connection } from 'mongoose';
import { TasksRepository } from './tasks.repo';
import { faker } from '@faker-js/faker';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class TasksSeeder extends Seeder<ICreateTask, Task> {
  constructor(
    @InjectConnection() connection: Connection,
    private readonly tasksRepository: TasksRepository,
  ) {
    super(connection);
  }

  async seed(): Promise<Task[]> {
    const toCreateParentTasks = Array(10)
      .fill(null)
      .map(() => this.fakeOne());
    const parentTasks = await this.create(toCreateParentTasks);
    const toCreateChildTasks = parentTasks.reduce((agg, parentTask) => {
      return [
        ...agg,
        ...Array(5)
          .fill(null)
          .map(() => ({
            ...this.fakeOne(),
            parentId: new mongoose.Types.ObjectId(parentTask.id),
          })),
      ];
    }, []);
    const childTasks = await this.create(toCreateChildTasks);
    return [...parentTasks, ...childTasks];
  }

  fakeOne(): ICreateTask {
    return {
      description: faker.lorem.lines({ min: 1, max: 4 }),
      title: faker.lorem.words({ min: 3, max: 10 }),
    };
  }

  create(interfaces: ICreateTask[]): Promise<Task[]> {
    return this.tasksRepository.create(interfaces);
  }

  clear() {
    this.tasksRepository.dropCollection();
  }
}
