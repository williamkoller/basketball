import { User } from '@/infra/db/entities/user.entity';
import { Controller, Get } from '@nestjs/common';
import { LoadAllUsersService } from '../services/load-all-users/load-all-users.service';

@Controller()
export class UsersController {
  constructor(private readonly loadAllUsersService: LoadAllUsersService) {}

  @Get('users')
  async loadAll(): Promise<User[]> {
    return await this.loadAllUsersService.load();
  }
}
