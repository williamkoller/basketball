import { Player } from '@/infra/db/entities/player.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddPlayerRepository } from '@/modules/players/repositories/add-player/add-player.repository';
import { LoadPlayerByNameRepository } from '@/modules/players/repositories/load-player-by-name/load-player-by-name.repository';
import { AddPlayerService } from '@/modules/players/services/add-player/add-player.service';
import { PlayerController } from '@/modules/players/controllers/player.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddPlayerRepository,
      LoadPlayerByNameRepository,
      Player,
    ]),
  ],
  providers: [AddPlayerService],
  controllers: [PlayerController],
})
export class PlayerModule {}
