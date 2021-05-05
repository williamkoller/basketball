import { User } from '@/infra/db/entities/user.entity';
import { Message } from '@/utils/@types/message/message.type';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';

@EntityRepository(User)
export class UpdateUserRepository extends Repository<User> {
  async updateUser({
    id,
    name,
    surname,
    email,
    password,
  }: UpdateUserDto): Promise<Message> {
    await this.update(id, { name, surname, email, password });
    return {
      message: 'User updated with successfully.',
    };
  }
}
