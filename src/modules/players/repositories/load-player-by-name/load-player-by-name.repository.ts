import { Player } from '@/infra/db/entities/player.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoadByNameDto } from '@/modules/players/dtos/load-by-name/load-by-name.dto';

@EntityRepository(Player)
export class LoadPlayerByNameRepository extends Repository<Player> {
  async lodaByName({ name }: LoadByNameDto): Promise<Player[]> {
    return await this.createQueryBuilder('players')
      .where(`(name) ILIKE :name`, { name: `%${name}%` })
      .getMany();
  }
}
