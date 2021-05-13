import { Player } from '@/infra/db/entities/player.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { AddPlayerDto } from '@/modules/players/dtos/add-player/add-player.dto';
import { AddPlayerRepository } from '@/modules/players/repositories/add-player/add-player.repository';
import { LoadPlayerByNameRepository } from '@/modules/players/repositories/load-player-by-name/load-player-by-name.repository';

@Injectable()
export class AddPlayerService {
  constructor(
    private readonly loadPlayerByNameRepository: LoadPlayerByNameRepository,
    private readonly addPlayerRepository: AddPlayerRepository,
  ) {}

  async add({
    age,
    birthDate,
    country,
    experience,
    height,
    lastAttented,
    numberPosition,
    name,
    surname,
    weight,
  }: AddPlayerDto): Promise<Player> {
    const player = await this.loadPlayerByNameRepository.lodaByName({ name });

    if (player?.length > 0) {
      throw new ConflictException(
        `There is already a user with this name: ${player.map((p) => p.name)}`,
      );
    }

    return await this.addPlayerRepository.addPlayer({
      age,
      birthDate,
      country,
      experience,
      height,
      lastAttented,
      numberPosition,
      name,
      surname,
      weight,
    });
  }
}
