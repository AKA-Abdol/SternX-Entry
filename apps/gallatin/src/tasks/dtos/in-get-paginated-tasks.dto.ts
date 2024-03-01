import { IsInt, IsOptional } from 'class-validator';

export class InGetPaginatedTasks {
  @IsOptional()
  @IsInt()
  page: number = 1;

  @IsOptional()
  @IsInt()
  perPage: number = 10;
}
