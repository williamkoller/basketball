import { Player } from '@/infra/db/entities/player.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddPlayerDto } from '@/modules/players/dtos/add-player/add-player.dto';
import { AddPlayerService } from '@/modules/players/services/add-player/add-player.service';
import { LoadAllPlayersService } from '@/modules/players/services/load-all-players/load-all-players.service';
import { LoadByIdDto } from '@/utils/dtos/load-by-id/load-by-id.dto';
import { LoadPlayerByIdService } from '@/modules/players/services/load-player-by-id/load-player-by-id.service';

@ApiTags('players')
@ApiBearerAuth()
@Controller('players')
export class PlayerController {
  constructor(
    private readonly addPlayerService: AddPlayerService,
    private readonly loadAllPlayersService: LoadAllPlayersService,
    private readonly loadPlayerByIdService: LoadPlayerByIdService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'There is already a user with this name.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add a new player.',
  })
  @UseGuards(JwtAuthGuard)
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

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all players.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('load-all')
  async loadAll(): Promise<Player[]> {
    return await this.loadAllPlayersService.loadAll();
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Player not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load player by id.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('load-by-id/:id')
  async loadById(@Param() { id }: LoadByIdDto): Promise<Player> {
    return await this.loadPlayerByIdService.loadPlayerById({ id });
  }
}
