import { User } from '@/infra/db/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadByIdDto } from '../../dtos/load-by-id/load-by-id.dto';
import { LoadUserByIdRepository } from '../../repositories/load-user-by-id/load-user-by-id.repository';

@Injectable()
export class LoadUserIdToAuthService {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async loadUserIdToAuth({ id }: LoadByIdDto): Promise<User> {
    const userAuthId = await this.loadUserByIdRepository.LoadById({ id });

    if (!userAuthId) {
      throw new NotFoundException('User not found.');
    }

    return userAuthId;
  }
}
