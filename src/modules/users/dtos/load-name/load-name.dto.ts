import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoadNameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
