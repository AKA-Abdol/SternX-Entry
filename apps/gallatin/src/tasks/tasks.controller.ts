import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { InCreateTaskDto } from './dtos/in-create-task.dto';
import {
  InUpdateTaskDto,
  InUpdateTaskParamDto,
} from './dtos/in-update-task.dto';
import { InDeleteTaskParamDto } from './dtos/in-delete-task.dto';
import { TaskDto } from './dtos/task.dto';
import { InGetTaskParamDto } from './dtos/in-get-task.dto';
import { InGetPaginatedTasks } from './dtos/in-get-paginated-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('')
  createTask(@Body() input: InCreateTaskDto): Promise<TaskDto> {
    return this.tasksService.createTask(input);
  }

  @Put('/:id')
  updateTask(
    @Param() { id }: InUpdateTaskParamDto,
    @Body() input: InUpdateTaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.updateTask(id, input);
  }

  @Delete('/:id')
  deleteTask(@Param() { id }: InDeleteTaskParamDto) {
    return this.tasksService.deleteTask(id);
  }

  @Get('/:id')
  getTask(@Param() { id }: InGetTaskParamDto) {
    return this.tasksService.getById(id);
  }

  @Get('/')
  getPaginatedTasks(@Query() input: InGetPaginatedTasks) {
    return this.tasksService.getPaginatedTasks(input.page, input.perPage);
  }
}
