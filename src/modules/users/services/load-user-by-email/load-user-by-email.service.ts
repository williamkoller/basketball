import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadEmailDto } from '@/modules/users/dtos/load-email/load-email.dto';
import { LoadUserByEmailRepository } from '@/modules/users/repositories/load-user-by-email/load-user-by-email.repository';
import { User } from '@/infra/db/entities/user.entity';

@Injectable()
export class LoadUserByEmailService {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async loadByEmail({ email }: LoadEmailDto): Promise<User> {
    const user = await this.loadUserByEmailRepository.loadByEmail({ email });
    if (!user) {
      throw new NotFoundException(
        `User not found with this e-mail: ${email} .`,
      );
    }

    delete user.password;

    return user;
  }
}
