import { IsNotEmpty, IsString } from 'class-validator';

export class LoadName {
  @IsString()
  @IsNotEmpty()
  name: string;
}
