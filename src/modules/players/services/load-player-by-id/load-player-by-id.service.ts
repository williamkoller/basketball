import { Player } from '@/infra/db/entities/player.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadByIdDto } from '@/modules/players/dtos/load-by-id/load-by-id.dto';
import { LoadPlayerByIdRepository } from '@/modules/players/repositories/load-player-by-id/load-player-by-id.repository';

@Injectable()
export class LoadPlayerByIdService {
  constructor(
    private readonly loadPlayerByIdRepository: LoadPlayerByIdRepository,
  ) {}

  async loadPlayerById({ id }: LoadByIdDto): Promise<Player> {
    const playerFound = await this.loadPlayerByIdRepository.loadById({ id });

    if (!playerFound) {
      throw new NotFoundException('User not found.');
    }

    return playerFound;
  }
}
