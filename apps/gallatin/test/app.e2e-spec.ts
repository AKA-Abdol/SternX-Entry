import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GallatinModule } from './../src/gallatin.module';
import { InCreateTaskDto } from '../src/tasks/dtos/in-create-task.dto';
import { Seeder } from '@app/common';
import { TasksSeeder } from '../src/tasks/tasks.seeder';
import { TasksService } from '../src/tasks/tasks.service';

describe('GallatinController (e2e)', () => {
  let app: INestApplication;
  let tasksService: TasksService;
  let seeder: Seeder;
  const mockTask: InCreateTaskDto = {
    description: 'consider using nestjs',
    title: 'SternX task',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GallatinModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    tasksService = moduleFixture.get<TasksService>(TasksService);
    seeder = moduleFixture.get<TasksSeeder>(TasksSeeder);
    await seeder.seed();
    await app.init();
  });

  afterEach(async () => {
    await seeder.clear();
    await app.close();
  });

  it('should create task', async () => {
    const task = await tasksService.createTask(mockTask);
    expect(task).toHaveProperty('id');
  });

  it('should update task', async () => {
    const newTask = await tasksService.createTask(mockTask);
    const id = newTask.id;
    const taskUpdate = {
      title: 'newTitle',
    };

    let task = await tasksService.updateTask({ ...taskUpdate, id });
    expect(task.title).toEqual(taskUpdate.title);
    expect(new Date(task.createdAt).getTime()).toBeLessThan(
      new Date(task.updatedAt).getTime(),
    );

    task = await tasksService.getById(id);
    expect(task.title).toEqual(taskUpdate.title);
  });

  it('should return 12 tasks', async () => {
    const tasks = await tasksService.getPaginatedTasks(1, 12);
    expect(tasks.tasks).toHaveLength(12);
  });

  it('should delete task by id', async () => {
    const tasks = await tasksService.getPaginatedTasks(12, 1);
    const task = tasks.tasks[0];
    const deletedTask = await tasksService.deleteTask(task.id);
    expect(deletedTask.id).toEqual(task.id);
    expect(() => tasksService.getById(deletedTask.id)).rejects.toThrow();
  });
});
