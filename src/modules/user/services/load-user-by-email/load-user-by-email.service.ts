import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadEmail } from '@/modules/user/dtos/load-email/load-email.dto';
import { LoadUserByEmailRepository } from '@/modules/user/repositories/load-user-by-email/load-user-by-email.repository';
import { User } from '@/infra/db/entities/user.entity';

@Injectable()
export class LoadUserByEmailService {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async loadByEmail({ email }: LoadEmail): Promise<User> {
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
