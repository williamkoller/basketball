import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/db/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddUserRepository } from '@/modules/user/repositories/add-user/add-user.repository';
import { LoadAllUsersRepository } from '@/modules/user/repositories/load-all-users/load-all-users.repository';
import { LoadAllUsersService } from '@/modules/user/services/load-all-users/load-all-users.service';
import { UsersController } from '@/modules/user/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, LoadAllUsersRepository])],
  providers: [AddUserRepository, Hasher, LoadAllUsersService],
  controllers: [UsersController],
})
export class UserModule {}
