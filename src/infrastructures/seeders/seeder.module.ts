// src/infrastructures/seeders/seeder.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { SeederService } from './seeder-service';
import { Service } from '../entities/service.entity';
import { Doctor } from '../entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Service, Doctor])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
