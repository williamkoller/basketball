import { Player } from '@/infra/db/entities/player.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Player)
export class LoadAllPlayersRepository extends Repository<Player> {
  async loadAll(): Promise<Player[]> {
    return await this.find();
  }
}
