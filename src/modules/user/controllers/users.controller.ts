import { User } from '@/infra/db/entities/user.entity';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { LoadAllUsersService } from '@/modules/user/services/load-all-users/load-all-users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '@/modules/user/dtos/add-user/add-user.dto';
import { AddUserService } from '@/modules/user/services/add-user/add-user.service';
import { LoadEmail } from '@/modules/user/dtos/load-email/load-email.dto';
import { LoadUserByEmailService } from '@/modules/user/services/load-user-by-email/load-user-by-email.service';
import { LoadName } from '../dtos/load-name/load-name.dto';
import { LoadUserByNameService } from '../services/load-user-by-name/load-user-by-name.service';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(
    private readonly loadAllUsersService: LoadAllUsersService,
    private readonly addUserService: AddUserService,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly loadUserByNameService: LoadUserByNameService,
  ) {}

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No records found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all users.',
  })
  @Get('users')
  async loadAll(): Promise<User[]> {
    return await this.loadAllUsersService.load();
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'There is already a user with this e-mail.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all users.',
  })
  @Post('new-user')
  async add(
    @Body() { name, surname, email, password }: AddUserDto,
  ): Promise<User> {
    return await this.addUserService.add({ name, surname, email, password });
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by e-mail.',
  })
  @Get('load-user-by-email')
  async loadByEmail(@Body() { email }: LoadEmail): Promise<User> {
    return await this.loadUserByEmailService.loadByEmail({
      email,
    });
  }

  @Get('load-name')
  async laodName(@Body() { name }: LoadName): Promise<User[]> {
    return await this.loadUserByNameService.loadName({ name });
  }
}
