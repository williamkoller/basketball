import { User } from '@/infra/db/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { LoadEmail } from '@/modules/users/dtos/load-email/load-email.dto';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { LoadName } from '@/modules/users/dtos/load-name/load-name.dto';
import { LoadUserByNameService } from '@/modules/users/services/load-user-by-name/load-user-by-name.service';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { Message } from '@/utils/@types/message/message.type';
import { UpdateUserService } from '@/modules/users/services/update-user/update-user.service';
import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import { LoadById } from '@/modules/users/dtos/load-by-id/load-by-id.dto';
import { DeleteUserService } from '@/modules/users/services/delete-user/delete-user.repository';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly loadAllUsersService: LoadAllUsersService,
    private readonly addUserService: AddUserService,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly loadUserByNameService: LoadUserByNameService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No records found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all users.',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
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
  @UseGuards(JwtAuthGuard)
  @Get('load-user-by-email')
  async loadByEmail(@Body() { email }: LoadEmail): Promise<User> {
    return await this.loadUserByEmailService.loadByEmail({
      email,
    });
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by name.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('load-name')
  async loadName(@Body() { name }: LoadName): Promise<User[]> {
    return await this.loadUserByNameService.loadName({ name });
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated with successfully.',
  })
  @UseGuards(JwtAuthGuard)
  @Put('update-password/:id')
  async updatePassword(
    @Param('id', ValidationParamsPipe, ParseUUIDPipe) id: string,
    @Body() { password }: UpdateUserDto,
  ): Promise<Message> {
    return await this.updateUserService.updatePassword({
      id,
      password,
    });
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted with successfully.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('delete-user/:id')
  async deleteUser(@Param() { id }: LoadById): Promise<Message> {
    return await this.deleteUserService.deleteUser({ id });
  }
}
