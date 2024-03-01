import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { GallatinModule } from './../src/gallatin.module';
import { InCreateTaskDto } from '../src/tasks/dtos/in-create-task.dto';
import { Seeder } from '@app/common';
import { TasksSeeder } from '../src/tasks/tasks.seeder';

describe('GallatinController (e2e)', () => {
  let app: INestApplication;
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
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    seeder = moduleFixture.get<TasksSeeder>(TasksSeeder);
    await seeder.seed();
    await app.init();
  });

  afterEach(async () => {
    await seeder.clear();
    await app.close();
  });

  it('/ (POST) should create task', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send(mockTask)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
      });
  });

  it('/ (PUT) should update task', async () => {
    const newTask = await request(app.getHttpServer())
      .post('/tasks')
      .send(mockTask)
      .expect(201);

    const id: number = newTask.body.id;
    const taskUpdate = {
      title: 'newTitle',
    };

    await request(app.getHttpServer())
      .put(`/tasks/${id}`)
      .send(taskUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body.title).toEqual(taskUpdate.title);
        expect(new Date(response.body.createdAt).getTime()).toBeLessThan(
          new Date(response.body.updatedAt).getTime(),
        );
      });

    return request(app.getHttpServer())
      .get(`/tasks/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.title).toEqual(taskUpdate.title);
      });
  });

  it('/ (POST) should reject and validate inputs', () => {
    request(app.getHttpServer()).post('/tasks').expect(400);
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ ...mockTask, parentId: 123 })
      .expect(400);
  });

  it('/ (GET) should return 10 default tasks', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(10);
      });
  });

  it('/ (GET) should return 12 tasks', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .query({
        perPage: 12,
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(12);
      });
  });

  it('/ (GET) should reject invalid mongoId', () => {
    return request(app.getHttpServer()).get('/tasks/123').expect(400);
  });

  it('/ (DELETE) should delete task by id', async () => {
    const tasks = await request(app.getHttpServer())
      .get('/tasks')
      .query({ page: 12, perPage: 1 })
      .expect(200);
    const task = tasks.body[0];
    await request(app.getHttpServer()).delete(`/tasks/${task.id}`).expect(200);
    return request(app.getHttpServer()).get(`/tasks/${task.id}`).expect(404);
  });
});
