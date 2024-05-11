import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserM } from 'src/domains/model/user';
import { AuthRepository } from 'src/domains/repositories/auth.repository';
import { AuthDto } from 'src/presentations/auth/dto/auth.dto';
import { LoginDto } from 'src/presentations/auth/dto/login.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepositoryOrm implements AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(ConfigService) private readonly _config: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async login(req: LoginDto): Promise<AuthDto> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: req.username,
      },
    });
    if (!user) {
      return null;
    }
    let isMatch = false;
    if (user) {
      isMatch = await bcrypt.compare(
        req.password + this._config.get<string>('APP_KEY'),
        user.password,
      );
    }
    if (user && isMatch) {
      const payload = { username: user.email, sub: user.id };
      return {
        ...this.toUser(user),
        access_token: this.jwtService.sign(payload, {
          secret: this._config.get<string>('APP_KEY'),
        }),
      };
    }
    throw new BadRequestException('message.invalid_credentials');
  }

  private toUser(userEntity: User): UserM {
    const user: UserM = new UserM();

    user.id = userEntity.id;
    user.email = userEntity.email;
    user.name = userEntity.name;
    user.password = userEntity.password;
    user.created_at = userEntity.created_at;
    user.updated_at = userEntity.updated_at;
    user.role = userEntity.role;

    return user;
  }
}
