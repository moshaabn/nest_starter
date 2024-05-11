import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { UserRepositoryOrm } from './user.repository';
import { Faq } from '../entities/faq.entity';
import { Service } from '../entities/service.entity';
import { ServiceRepositoryOrm } from './service.repository';
import { FaqRepositoryOrm } from './faq.repository';
import { ServiceImage } from '../entities/image.entity';
import { AuthRepositoryOrm } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from '../entities/doctor.entity';
import { DoctorRepositoryOrm } from './doctor.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Faq, Service, ServiceImage, Doctor]),
  ],
  providers: [
    UserRepositoryOrm,
    FaqRepositoryOrm,
    ServiceRepositoryOrm,
    DoctorRepositoryOrm,
    AuthRepositoryOrm,
    JwtService,
  ],
  exports: [
    UserRepositoryOrm,
    FaqRepositoryOrm,
    ServiceRepositoryOrm,
    DoctorRepositoryOrm,
    AuthRepositoryOrm,
    JwtService,
  ],
})
export class RepositoriesModule {}
