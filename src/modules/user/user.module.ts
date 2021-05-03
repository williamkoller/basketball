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
import { LoadUserByNameRepository } from '@/modules/user/repositories/load-user-by-name/load-user-by-name.repository';
import { LoadUserByNameService } from '@/modules/user/services/load-user-by-name/load-user-by-name.service';
import { LoadUserByIdRepository } from '@/modules/user/repositories/load-user-by-id/load-user-by-id.repository';
import { LoadUserIdToAuthService } from '@/modules/user/services/load-user-auth-by-id/load-user-auth-by-id.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LoadAllUsersRepository,
      LoadUserByEmailRepository,
      LoadUserByNameRepository,
      LoadUserByIdRepository,
    ]),
  ],
  providers: [
    AddUserRepository,
    Hasher,
    LoadAllUsersService,
    AddUserService,
    LoadUserByEmailService,
    LoadUserByNameService,
    LoadUserIdToAuthService,
  ],
  controllers: [UsersController],
})
export class UserModule {}
