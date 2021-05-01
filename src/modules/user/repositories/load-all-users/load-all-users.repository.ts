import { User } from '@/infra/db/entities/user.entity';
import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class LoadAllUsersRepository extends Repository<User> {
  private logger = new Logger(LoadAllUsersRepository.name);
  async loadAll(): Promise<User[]> {
    return await this.find();
  }
}
