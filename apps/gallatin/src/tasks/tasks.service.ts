import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repo';
import { InCreateTaskDto } from './dtos/in-create-task.dto';
import mongoose from 'mongoose';
import { ICreateTask } from './interfaces/create-task.interface';
import { InUpdateTaskDto } from './dtos/in-update-task.dto';
import { TaskDto } from './dtos/task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async createTask(input: InCreateTaskDto): Promise<TaskDto> {
    const taskToCreate: ICreateTask = {
      title: input.title,
      description: input.description,
    };
    if (input.parentId)
      taskToCreate.parentId = new mongoose.Types.ObjectId(input.parentId);
    const task = await this.tasksRepository.createOne(taskToCreate);
    return TaskDto.fromTask(task);
  }

  async updateTask(id: string, input: InUpdateTaskDto): Promise<TaskDto> {
    const { parentId, ...rest } = input;
    const taskToCreate = parentId
      ? { ...rest, parentId: new mongoose.Types.ObjectId(parentId) }
      : rest;

    const task = await this.tasksRepository.updateById(id, taskToCreate);
    return TaskDto.fromTask(task);
  }

  deleteTask(id: string) {
    return this.tasksRepository.deleteById(id);
  }

  async getById(id: string): Promise<TaskDto> {
    const task = await this.tasksRepository.getById(id);
    if (!task) throw new NotFoundException('task not found.');
    return TaskDto.fromTask(task);
  }

  async getPaginatedTasks(page: number, perPage: number): Promise<TaskDto[]> {
    const offset = (page - 1) * perPage;
    const tasks = await this.tasksRepository.getPaginatedTasks(offset, perPage);
    return tasks.map(TaskDto.fromTask);
  }
}
