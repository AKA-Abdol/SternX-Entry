import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  id: mongoose.Types.ObjectId;

  @Prop({ default: null })
  parentId: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}
