import { User } from '@/infra/db/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoadEmail } from '@/modules/users/dtos/load-email/load-email.dto';

@EntityRepository(User)
export class LoadUserByEmailRepository extends Repository<User> {
  async loadByEmail({ email }: LoadEmail): Promise<User> {
    return await this.findOne({ email });
  }
}
