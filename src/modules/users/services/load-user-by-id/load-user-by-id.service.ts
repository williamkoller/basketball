import { User } from '@/infra/db/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadById } from '../../dtos/load-by-id/load-by-id.dto';
import { LoadUserByIdRepository } from '../../repositories/load-user-by-id/load-user-by-id.repository';

@Injectable()
export class LoadUserByIdService {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async loadById({ id }: LoadById): Promise<User> {
    const user = await this.loadUserByIdRepository.loadById({ id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
