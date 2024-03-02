import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class InCreateTaskDto {
  @IsOptional()
  @IsMongoId()
  parentId?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
