import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TaskDto } from 'apps/gallatin/src/tasks/dtos/task.dto';
import { TasksController } from 'apps/gallatin/src/tasks/tasks.controller';
import { InCreateTaskDto } from './dtos/in-create-task.dto';
import {
  InUpdateTaskDto,
  InUpdateTaskParamDto,
} from './dtos/in-update-task.dto';
import { InDeleteTaskParamDto } from './dtos/in-delete-task.dto';
import { InGetTaskParamDto } from './dtos/in-get-task.dto';
import { InGetPaginatedTasksDto } from './dtos/in-get-paginated-tasks.dto';

@Controller('tasks')
export class NashvilleController implements OnModuleInit {
  private gallatinService: TasksController;

  constructor(@Inject('GALLATIN_GRPC') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.gallatinService =
      this.client.getService<TasksController>('TasksService');
  }

  @Post('')
  createTask(@Body() input: InCreateTaskDto): Promise<TaskDto> {
    return this.gallatinService.createTask(input);
  }

  @Put('/:id')
  updateTask(
    @Param() { id }: InUpdateTaskParamDto,
    @Body() input: InUpdateTaskDto,
  ): Promise<TaskDto> {
    return this.gallatinService.updateTask({ ...input, id });
  }

  @Delete('/:id')
  deleteTask(@Param() input: InDeleteTaskParamDto) {
    return this.gallatinService.deleteTask(input);
  }

  @Get('/:id')
  getTask(@Param() input: InGetTaskParamDto) {
    return this.gallatinService.getTask(input);
  }

  @Get('/')
  getPaginatedTasks(@Query() input: InGetPaginatedTasksDto) {
    return this.gallatinService.getPaginatedTasks(input);
  }
}
