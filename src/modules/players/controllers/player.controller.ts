import { Player } from '@/infra/db/entities/player.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddPlayerDto } from '@/modules/players/dtos/add-player/add-player.dto';
import { AddPlayerService } from '@/modules/players/services/add-player/add-player.service';
import { LoadAllPlayersService } from '@/modules/players/services/load-all-players/load-all-players.service';

@ApiTags('players')
@ApiBearerAuth()
@Controller('players')
export class PlayerController {
  constructor(
    private readonly addPlayerService: AddPlayerService,
    private readonly loadAllPlayersService: LoadAllPlayersService,
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
    description: 'Load all players',
  })
  @UseGuards(JwtAuthGuard)
  @Get('load-all')
  async loadAll(): Promise<Player[]> {
    return await this.loadAllPlayersService.loadAll();
  }
}
