import { Player } from '@/infra/db/entities/player.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddPlayerRepository } from '@/modules/players/repositories/add-player/add-player.repository';
import { LoadPlayerByNameRepository } from '@/modules/players/repositories/load-player-by-name/load-player-by-name.repository';
import { AddPlayerService } from '@/modules/players/services/add-player/add-player.service';
import { PlayerController } from '@/modules/players/controllers/player.controller';
import { LoadAllPlayersRepository } from '@/modules/players/repositories/load-all-players/load-all-players.repository';
import { LoadAllPlayersService } from '@/modules/players/services/load-all-players/load-all-players.service';
import { LoadPlayerByIdRepository } from '@/modules/players/repositories/load-player-by-id/load-player-by-id.repository';
import { LoadPlayerByIdService } from '@/modules/players/services/load-player-by-id/load-player-by-id.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddPlayerRepository,
      LoadPlayerByNameRepository,
      Player,
      LoadAllPlayersRepository,
      LoadPlayerByIdRepository,
    ]),
  ],
  providers: [AddPlayerService, LoadAllPlayersService, LoadPlayerByIdService],
  controllers: [PlayerController],
})
export class PlayerModule {}
