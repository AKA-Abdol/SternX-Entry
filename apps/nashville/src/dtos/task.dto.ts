import { Task } from 'apps/gallatin/src/tasks/tasks.schema';

export class TaskDto {
  id: string;
  title: string;
  description: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;

  static fromTask(task: Task): TaskDto {
    const dto = new TaskDto();
    dto.id = task.id;
    dto.title = task.title;
    dto.description = task.description;
    dto.parentId = task.parentId ? task.parentId.toString() : null;
    dto.createdAt = task.createdAt;
    dto.updatedAt = task.updatedAt;
    return dto;
  }
}
