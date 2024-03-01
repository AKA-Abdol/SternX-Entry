import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class InGetPaginatedTasks {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  perPage: number = 10;
}
