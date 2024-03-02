import { IsMongoId } from 'class-validator';

export class InDeleteTaskDto {
  @IsMongoId()
  id: string;
}
