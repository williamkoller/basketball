import { User } from '@/infra/db/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadNameDto } from '../../dtos/load-name/load-name.dto';
import { LoadUserByNameRepository } from '../../repositories/load-user-by-name/load-user-by-name.repository';

@Injectable()
export class LoadUserByNameService {
  constructor(
    private readonly loadUserByNameRepository: LoadUserByNameRepository,
  ) {}

  async LoadUserByName({ name }: LoadNameDto): Promise<User[]> {
    const userNames = await this.loadUserByNameRepository.loadByName({ name });

    if (!userNames?.length) {
      throw new NotFoundException('User not found.');
    }

    userNames.map((userName) => delete userName.password);

    return userNames;
  }
}
