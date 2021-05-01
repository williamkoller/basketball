import { configService } from '@/infra/db/config/config.service';
import { UserModule } from '@/modules/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]),
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
