import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/db/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddUserRepository } from '@/modules/user/repositories/add-user/add-user.repository';
import { LoadAllUsersRepository } from '@/modules/user/repositories/load-all-users/load-all-users.repository';
import { LoadAllUsersService } from '@/modules/user/services/load-all-users/load-all-users.service';
import { UsersController } from '@/modules/user/controllers/users.controller';
import { AddUserService } from '@/modules/user/services/add-user/add-user.service';
import { LoadUserByEmailRepository } from '@/modules/user/repositories/load-user-by-email/load-user-by-email.repository';
import { LoadUserByEmailService } from '@/modules/user/services/load-user-by-email/load-user-by-email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LoadAllUsersRepository,
      LoadUserByEmailRepository,
    ]),
  ],
  providers: [
    AddUserRepository,
    Hasher,
    LoadAllUsersService,
    AddUserService,
    LoadUserByEmailService,
  ],
  controllers: [UsersController],
})
export class UserModule {}
