import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { InCreateTaskDto } from './dtos/in-create-task.dto';
import { InUpdateTaskDto } from './dtos/in-update-task.dto';
import { TaskDto } from './dtos/task.dto';
import { InGetPaginatedTasks } from './dtos/in-get-paginated-tasks.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { InGetTaskDto } from './dtos/in-get-task.dto';
import { InDeleteTaskDto } from './dtos/in-delete-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TasksService')
  createTask(input: InCreateTaskDto): Promise<TaskDto> {
    return this.tasksService.createTask(input);
  }

  @GrpcMethod('TasksService')
  updateTask(input: InUpdateTaskDto): Promise<TaskDto> {
    return this.tasksService.updateTask(input);
  }

  @GrpcMethod('TasksService')
  deleteTask(input: InDeleteTaskDto) {
    return this.tasksService.deleteTask(input.id);
  }

  @GrpcMethod('TasksService')
  getTask(input: InGetTaskDto) {
    return this.tasksService.getById(input.id);
  }

  @GrpcMethod('TasksService')
  getPaginatedTasks(input: InGetPaginatedTasks) {
    return this.tasksService.getPaginatedTasks(input.page, input.perPage);
  }
}
