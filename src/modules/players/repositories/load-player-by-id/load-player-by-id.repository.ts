import { Player } from '@/infra/db/entities/player.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoadByIdDto } from '@/modules/players/dtos/load-by-id/load-by-id.dto';

@EntityRepository(Player)
export class LoadPlayerByIdRepository extends Repository<Player> {
  async loadById({ id }: LoadByIdDto): Promise<Player> {
    return await this.findOne(id);
  }
}
