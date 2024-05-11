import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';
import { UserModule } from './presentations/user/user.module';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { UserController } from './presentations/user/user.controller';
import { SeederModule } from './infrastructures/seeders/seeder.module';
import { ServiceModule } from './presentations/service/service.module';
import { AuthModule } from './presentations/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthModule } from './presentations/admin/auth/auth.module';
import { AdminAuthController } from './presentations/admin/auth/auth.controller';
import { AuthController } from './presentations/auth/auth.controller';
import { ServiceController } from './presentations/service/service.controller';
import { AdminServiceModule } from './presentations/admin/service/service.module';
import { AdminServiceController } from './presentations/admin/service/service.controller';
import { DoctorModule } from './presentations/doctor/service/doctor.module';
import { DoctorController } from './presentations/doctor/service/doctor.controller';
import { AdminDoctorModule } from './presentations/admin/doctor/doctor.module';
import { AdminDoctorController } from './presentations/admin/doctor/doctor.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsecaseProxyModule.register(),
    AuthModule,
    UserModule,
    ServiceModule,
    EnvironmentConfigModule,
    SeederModule,
    AdminAuthModule,
    AdminServiceModule,
    DoctorModule,
    AdminDoctorModule,
  ],
  controllers: [
    UserController,
    AdminAuthController,
    AuthController,
    ServiceController,
    AdminServiceController,
    DoctorController,
    AdminDoctorController,
  ],
})
export class AppModule {}
