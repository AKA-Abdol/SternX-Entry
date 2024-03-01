import { IsMongoId } from 'class-validator';

export class InDeleteTaskParamDto {
  @IsMongoId()
  id: string;
}
