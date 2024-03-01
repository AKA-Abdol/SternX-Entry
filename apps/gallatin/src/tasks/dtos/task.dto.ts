import { Task } from '../tasks.schema';

export class TaskDto {
  id: string;
  parentId: string | null;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  static fromTask(task: Task): TaskDto {
    const dto = new TaskDto();
    dto.id = task.id;
    dto.parentId = task.parentId ? task.parentId.toString() : null;
    dto.title = task.title;
    dto.description = task.description;
    dto.createdAt = task.createdAt;
    dto.updatedAt = task.updatedAt;
    return dto;
  }
}
