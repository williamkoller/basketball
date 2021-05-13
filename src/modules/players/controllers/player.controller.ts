import { Player } from '@/infra/db/entities/player.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddPlayerDto } from '../dtos/add-player/add-player.dto';
import { AddPlayerService } from '../services/add-player/add-player.service';

@ApiTags('players')
@Controller('players')
export class PlayerController {
  constructor(private readonly addPlayerService: AddPlayerService) {}

  @Post('add-player')
  async add(
    @Body()
    {
      age,
      birthDate,
      country,
      experience,
      height,
      lastAttented,
      name,
      surname,
      numberPosition,
      weight,
    }: AddPlayerDto,
  ): Promise<Player> {
    return await this.addPlayerService.add({
      age,
      birthDate,
      country,
      experience,
      height,
      lastAttented,
      name,
      surname,
      numberPosition,
      weight,
    });
  }
}
