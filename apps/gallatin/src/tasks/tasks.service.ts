import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repo';
import { InCreateTaskDto } from './dtos/in-create-task.dto';
import mongoose from 'mongoose';
import { ICreateTask } from './interfaces/create-task.interface';
import { InUpdateTaskDto } from './dtos/in-update-task.dto';
import { TaskDto } from './dtos/task.dto';
import { ClientProxy } from '@nestjs/microservices';
import {
  GALLATIN_CREATE_TASK_TOPIC,
  GALLATIN_DELETE_TASK_TOPIC,
  GALLATIN_LOGGER_QUEUE,
  GALLATIN_UPDATE_TASK_TOPIC,
} from '@app/common/payload/gallatin/constant';
import { OutGetPaginatedTasksDto } from './dtos/out-get-paginated-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    @Inject(GALLATIN_LOGGER_QUEUE) private readonly clientProxy: ClientProxy,
  ) {}

  async createTask(input: InCreateTaskDto): Promise<TaskDto> {
    const taskToCreate: ICreateTask = {
      title: input.title,
      description: input.description,
    };
    if (input.parentId)
      taskToCreate.parentId = new mongoose.Types.ObjectId(input.parentId);
    const task = await this.tasksRepository.createOne(taskToCreate);
    const dto = TaskDto.fromTask(task);
    this.clientProxy.emit(GALLATIN_CREATE_TASK_TOPIC, dto);
    return dto;
  }

  async updateTask(input: InUpdateTaskDto): Promise<TaskDto> {
    const { parentId, id, ...rest } = input;
    const taskToCreate = parentId
      ? { ...rest, parentId: new mongoose.Types.ObjectId(parentId) }
      : rest;

    const task = await this.tasksRepository.updateById(id, taskToCreate);
    const dto = TaskDto.fromTask(task);
    this.clientProxy.emit(GALLATIN_UPDATE_TASK_TOPIC, dto);
    return dto;
  }

  async deleteTask(id: string): Promise<TaskDto> {
    const deletedTask = await this.tasksRepository.deleteById(id);
    const dto = TaskDto.fromTask(deletedTask);
    this.clientProxy.emit(GALLATIN_DELETE_TASK_TOPIC, dto);
    return dto;
  }

  async getById(id: string): Promise<TaskDto> {
    const task = await this.tasksRepository.getById(id);
    if (!task) throw new NotFoundException('task not found.');
    return TaskDto.fromTask(task);
  }

  async getPaginatedTasks(
    page: number,
    perPage: number,
  ): Promise<OutGetPaginatedTasksDto> {
    const offset = (page - 1) * perPage;
    const tasks = await this.tasksRepository.getPaginatedTasks(offset, perPage);
    return { tasks: tasks.map(TaskDto.fromTask) };
  }
}
