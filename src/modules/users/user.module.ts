import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/db/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddUserRepository } from '@/modules/users/repositories/add-user/add-user.repository';
import { LoadAllUsersRepository } from '@/modules/users/repositories/load-all-users/load-all-users.repository';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { LoadUserByEmailRepository } from '@/modules/users/repositories/load-user-by-email/load-user-by-email.repository';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { LoadUserByNameRepository } from '@/modules/users/repositories/load-user-by-name/load-user-by-name.repository';
import { LoadUserByNameService } from '@/modules/users/services/load-user-by-name/load-user-by-name.service';
import { LoadUserByIdRepository } from '@/modules/users/repositories/load-user-by-id/load-user-by-id.repository';
import { LoadUserIdToAuthService } from '@/modules/users/services/load-user-auth-by-id/load-user-auth-by-id.service';
import { DeleteUserRepository } from '@/modules/users/repositories/delete-user/delete-user.repository';
import { UpdateUserRepository } from '@/modules/users/repositories/update-user/update-user-repository';
import { UpdateUserService } from '@/modules/users/services/update-user/update-user.service';
import { HashComparer } from '@/infra/cryptography/hash-comparer/hash-comparer';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { DeleteUserService } from '@/modules/users/services/delete-user/delete-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LoadAllUsersRepository,
      LoadUserByEmailRepository,
      LoadUserByNameRepository,
      LoadUserByIdRepository,
      DeleteUserRepository,
      UpdateUserRepository,
    ]),
  ],
  providers: [
    AddUserRepository,
    Hasher,
    HashComparer,
    LoadAllUsersService,
    AddUserService,
    LoadUserByEmailService,
    LoadUserByNameService,
    LoadUserIdToAuthService,
    UpdateUserService,
    LoadUserByIdService,
    DeleteUserService,
  ],
  controllers: [UsersController],
})
export class UserModule {}
