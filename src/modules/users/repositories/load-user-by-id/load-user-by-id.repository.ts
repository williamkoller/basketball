import { User } from '@/infra/db/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoadByIdDto } from '../../dtos/load-by-id/load-by-id.dto';

@EntityRepository(User)
export class LoadUserByIdRepository extends Repository<User> {
  async LoadById({ id }: LoadByIdDto): Promise<User> {
    return await this.findOne({ where: { id } });
  }
}
