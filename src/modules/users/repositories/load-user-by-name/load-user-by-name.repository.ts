import { User } from '@/infra/db/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoadNameDto } from '@/modules/users/dtos/load-name/load-name.dto';

@EntityRepository(User)
export class LoadUserByNameRepository extends Repository<User> {
  async loadByName({ name }: LoadNameDto): Promise<User[]> {
    return await this.createQueryBuilder('users')
      .where(`(name) ILIKE :name`, { name: `%${name}%` })
      .getMany();
  }
}
