import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/infrastructures/middlewares/strategies/jwt.strategy';
import { UserModule } from '../../user/user.module';
import { User } from 'src/infrastructures/entities/user.entity';
import { AdminAuthController } from './auth.controller';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        defaultStrategy: JwtStrategy,
        secret: config.get<string>('APP_KEY'),
        signOptions: { expiresIn: '180d' },
      }),
      inject: [ConfigService],
    }),
    UsecaseProxyModule.register(),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AdminAuthController],
  providers: [JwtStrategy],
  exports: [],
})
export class AdminAuthModule {}
