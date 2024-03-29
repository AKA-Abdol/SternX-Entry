import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class InUpdateTaskDto {
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsMongoId()
  parentId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
