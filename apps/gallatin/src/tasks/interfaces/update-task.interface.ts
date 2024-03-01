import { ICreateTask } from './create-task.interface';

export interface IUpdateTask extends Partial<ICreateTask> {}
