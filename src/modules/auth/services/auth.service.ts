import { HashComparer } from '@/infra/cryptography/hash-comparer/hash-comparer';
import { User } from '@/infra/db/entities/user.entity';
import { LoadUserByEmailRepository } from '@/modules/users/repositories/load-user-by-email/load-user-by-email.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from '../dtos/auth-user/auth-user.dto';
import { UserTokenInputType } from '../dtos/user-token-input/user-token-input.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: AuthUserDto): Promise<UserTokenInputType> {
    const user = await this.loadUserByEmailRepository.loadByEmail({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await this.hashComparer.hashComparer(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password or email.');
    }

    delete user.password;

    return {
      user,
      token: await this.generateToken(user),
    };
  }

  async generateToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      name: user.name,
      surname: user.surname,
    };

    return this.jwtService.signAsync(payload);
  }
}
