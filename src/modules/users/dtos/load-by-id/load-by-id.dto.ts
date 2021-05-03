import { IsNotEmpty, IsUUID } from 'class-validator';

export class LoadById {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
