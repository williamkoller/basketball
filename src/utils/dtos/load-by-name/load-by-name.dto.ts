import { IsNotEmpty, IsString } from 'class-validator';

export class LoadByNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
