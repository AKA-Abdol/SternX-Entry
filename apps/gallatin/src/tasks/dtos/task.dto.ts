import { Task } from '../tasks.schema';

export class TaskDto {
  id: string;
  title: string;
  description: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;

  static fromTask(task: Task): TaskDto {
    const dto = new TaskDto();
    dto.id = task.id;
    dto.title = task.title;
    dto.description = task.description;
    dto.parentId = task.parentId ? task.parentId.toString() : null;
    dto.createdAt = task.createdAt.toISOString();
    dto.updatedAt = task.updatedAt.toISOString();
    return dto;
  }
}
