import { User } from '@/infra/db/entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { AddUserDto } from '../../dtos/add-user/add-user.dto';
import { AddUserRepository } from '../../repositories/add-user/add-user.repository';
import { LoadUserByEmailRepository } from '../../repositories/load-user-by-email/load-user-by-email.repository';

@Injectable()
export class AddUserService {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly addUserRepository: AddUserRepository,
  ) {}

  async add({ name, surname, email, password }: AddUserDto): Promise<User> {
    const user = await this.loadUserByEmailRepository.loadByEmail({ email });

    if (user) {
      throw new ConflictException(
        `There is already a user with this email: ${email}`,
      );
    }

    return await this.addUserRepository.add({ name, surname, email, password });
  }
}
