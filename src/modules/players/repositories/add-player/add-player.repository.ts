import { Player } from '@/infra/db/entities/player.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddPlayerDto } from '@/modules/players/dtos/add-player/add-player.dto';
import { validateAge } from '@/utils/validator/validate-age';
import { getFormattedDate } from '@/utils/validator/get-formatted-date';

@EntityRepository(Player)
export class AddPlayerRepository extends Repository<Player> {
  async addPlayer({
    age,
    birthDate,
    experience,
    lastAttented,
    height,
    name,
    country,
    numberPosition,
    surname,
    weight,
  }: AddPlayerDto): Promise<Player> {
    const createPalyer = this.create({
      age: String(validateAge(age)),
      birthDate: getFormattedDate(birthDate),
      experience,
      lastAttented,
      height,
      name,
      country,
      surname,
      numberPosition,
      weight,
    });

    return await this.save(createPalyer);
  }
}
