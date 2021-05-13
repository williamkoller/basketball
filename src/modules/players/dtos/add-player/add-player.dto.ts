import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPlayerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  numberPosition: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastAttented: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  height: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  weight: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  experience: string;

  @ApiProperty()
  @IsString()
  age: string;

  @ApiProperty()
  @IsString()
  birthDate: string;
}
