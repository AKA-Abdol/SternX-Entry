import { IsMongoId } from 'class-validator';

export class InGetTaskParamDto {
  @IsMongoId()
  id: string;
}
