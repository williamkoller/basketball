import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoadEmail {
  @ApiProperty()
  @IsEmail()
  email: string;
}
