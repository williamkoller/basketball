import { User } from '@/infra/db/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadAllUsersRepository } from '../../repositories/load-all-users/load-all-users.repository';

@Injectable()
export class LoadAllUsersService {
  constructor(
    private readonly loadAllUsersRepository: LoadAllUsersRepository,
  ) {}
  async load(): Promise<User[]> {
    const users = await this.loadAllUsersRepository.loadAll();

    if (!users.length) {
      throw new NotFoundException('No record found.');
    }

    return users;
  }
}
