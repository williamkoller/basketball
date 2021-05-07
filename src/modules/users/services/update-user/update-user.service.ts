import { HashComparer } from '@/infra/cryptography/hash-comparer/hash-comparer';
import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/db/entities/user.entity';
import { Message } from '@/utils/@types/message/message.type';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { LoadById } from '../../dtos/load-by-id/load-by-id.dto';
import { UpdateUserDto } from '../../dtos/update-user/update-user.dto';
import { LoadUserByIdRepository } from '../../repositories/load-user-by-id/load-user-by-id.repository';
import { UpdateUserRepository } from '../../repositories/update-user/update-user-repository';

@Injectable()
export class UpdateUserService {
  private logger = new Logger(UpdateUserService.name);
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly hasher: Hasher,
    private readonly hasherComparer: HashComparer,
  ) {}
  async updatePassword({ id, password }: UpdateUserDto): Promise<Message> {
    const user = await this.loadUserById({ id });
    const hashPassword = await this.hasher.hash(password);

    const comparePassword = await this.hasherComparer.hashComparer(
      password,
      user.password,
    );

    if (comparePassword) {
      throw new BadRequestException(
        'The password cannot be identical to the previous one.',
      );
    }

    await this.updateUserRepository.update(id, {
      password: hashPassword,
    });

    return {
      message: 'Password updated successfully.',
    };
  }

  async update({ id, name, surname, email }: UpdateUserDto): Promise<Message> {
    await this.loadUserById({ id });

    await this.updateUserRepository.updateUser({ id, name, surname, email });

    return {
      message: 'User updated successfully.',
    };
  }

  async loadUserById({ id }: LoadById): Promise<User> {
    const user = await this.loadUserByIdRepository.loadById({ id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
