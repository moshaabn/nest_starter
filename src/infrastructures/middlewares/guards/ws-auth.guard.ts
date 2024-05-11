import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { EnvironmentConfigService } from 'src/infrastructures/config/environment-config/environment-config.service';
import { User } from 'src/infrastructures/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly environmentConfigService: EnvironmentConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    // try {
    const client = context.switchToWs().getClient();
    console.log(client.handshake.headers.authorization);
    const authToken = client.handshake.headers.authorization?.split(' ')[1];
    const jwtPayload: any = <any>(
      jwt.verify(authToken, this.environmentConfigService.getAppSecretSync())
    );
    const user: User = await this.userRepository.findOneBy({
      id: jwtPayload.sub,
    });

    context.switchToWs().getClient().user = user;
    return Boolean(user);
    // } catch (error) {
    //   throw new UnauthorizedException();
    // }
  }
}
