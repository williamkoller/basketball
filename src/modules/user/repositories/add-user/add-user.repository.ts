import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/db/entities/user.entity';
import { AddUserDto } from '@/modules/user/dtos/add-user/add-user.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly addUserRepository: Repository<User>,
    private readonly hasher: Hasher,
  ) {}
  async add(data: AddUserDto): Promise<any> {
    const user = Object.assign({} as User, data);

    const newUser = this.addUserRepository.create({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: await this.hasher.hash(user.password),
    });

    validateOrReject(newUser);
    return await this.addUserRepository.save(newUser);
  }
}
