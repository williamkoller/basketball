import { Player } from '@/infra/db/entities/player.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadAllPlayersRepository } from '../../repositories/load-all-players/load-all-players.repository';

@Injectable()
export class LoadAllPlayersService {
  constructor(
    private readonly loadAllPlayersRepository: LoadAllPlayersRepository,
  ) {}

  async loadAll(): Promise<Player[]> {
    const players = await this.loadAllPlayersRepository.loadAll();

    if (players?.length === 0) {
      throw new NotFoundException('No record found.');
    }

    return players;
  }
}
