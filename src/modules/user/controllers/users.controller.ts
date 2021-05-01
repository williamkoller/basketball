import { User } from '@/infra/db/entities/user.entity';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { LoadAllUsersService } from '../services/load-all-users/load-all-users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly loadAllUsersService: LoadAllUsersService) {}

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
}
