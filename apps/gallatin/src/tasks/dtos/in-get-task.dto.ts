import { IsMongoId } from 'class-validator';

export class InGetTaskDto {
  @IsMongoId()
  id: string;
}
