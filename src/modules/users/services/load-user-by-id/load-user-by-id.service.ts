import { User } from '@/infra/db/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadByIdDto } from '../../dtos/load-by-id/load-by-id.dto';
import { LoadUserByIdRepository } from '../../repositories/load-user-by-id/load-user-by-id.repository';

@Injectable()
export class LoadUserByIdService {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async LoadByIdDto({ id }: LoadByIdDto): Promise<User> {
    const user = await this.loadUserByIdRepository.LoadByIdDto({ id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
