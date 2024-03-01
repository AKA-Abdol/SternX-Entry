import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class InUpdateTaskParamDto {
  @IsMongoId()
  id: string;
}

export class InUpdateTaskDto {
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
