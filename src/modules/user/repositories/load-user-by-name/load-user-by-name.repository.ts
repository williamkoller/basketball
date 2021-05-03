import { User } from '@/infra/db/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoadName } from '@/modules/user/dtos/load-name/load-name.dto';

@EntityRepository(User)
export class LoadUserByNameRepository extends Repository<User> {
  async loadByName({ name }: LoadName): Promise<User[]> {
    return await this.createQueryBuilder('users')
      .where(`(name) ILIKE :name`, { name: `%${name}%` })
      .getMany();
  }
}
