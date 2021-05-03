import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class LoadById {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
