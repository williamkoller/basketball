import { configService } from '@/infra/db/config/config.service';
import { UserModule } from '@/modules/users/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '@/modules/auth/auth.module';
import { CoreModule } from '@/modules/core/core.module';
import { TeamsModule } from '@/modules/teams/teams.module';
import { ClassificationModule } from '@/modules/classification/classification.module';
import { PlayerModule } from '@/modules/players/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CoreModule),
    forwardRef(() => TeamsModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => ClassificationModule),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
