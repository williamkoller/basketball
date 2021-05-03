import { User } from '@/infra/db/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoadById } from '../../dtos/load-by-id/load-by-id.dto';

@EntityRepository(User)
export class LoadUserByIdRepository extends Repository<User> {
  async loadById({ id }: LoadById): Promise<User> {
    return await this.findOne(id);
  }
}
