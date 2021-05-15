import { IsNotEmpty, IsUUID } from 'class-validator';

export class LoadByIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
