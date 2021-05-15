import { Player } from '@/infra/db/entities/player.entity';
import { Repository } from 'typeorm';
import { LoadByIdDto } from '@/modules/players/dtos/load-by-id/load-by-id.dto';

export class LoadPlayerByIdRepository extends Repository<Player> {
  async loadById({ id }: LoadByIdDto): Promise<Player> {
    return this.findOne(id);
  }
}
