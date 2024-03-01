import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.schema';
import { Connection, Model } from 'mongoose';
import { ICreateTask } from './interfaces/create-task.interface';
import { IUpdateTask } from './interfaces/update-task.interface';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(Task.name) private readonly model: Model<Task>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  createOne(task: ICreateTask): Promise<Task> {
    return this.model.create(task);
  }

  create(tasks: ICreateTask[]): Promise<Task[]> {
    return this.model.create(tasks);
  }

  updateById(id: string, taskUpdate: IUpdateTask): Promise<Task> {
    return this.model.findByIdAndUpdate(id, taskUpdate, { new: true }).exec();
  }

  deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  getById(id: string): Promise<Task> {
    return this.model.findById(id).exec();
  }

  getPaginatedTasks(offset: number, limit: number): Promise<Task[]> {
    return this.model.find().skip(offset).limit(limit).exec();
  }

  dropCollection() {
    this.connection.db.dropCollection(this.model.collection.collectionName);
  }
}
