import mongoose from 'mongoose';

export interface ICreateTask {
  parentId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
}
