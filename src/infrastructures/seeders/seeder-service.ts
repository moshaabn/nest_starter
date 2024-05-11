import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { seedUsers } from './user-seeder';
import { seedServices } from './service-seeder';
import { Service } from '../entities/service.entity';
import { ConfigService } from '@nestjs/config';
import { seedDoctors } from './doctor-seeder';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @Inject(ConfigService) private readonly _config: ConfigService,
  ) {}
  async seed() {
    // await seedUsers(this.userRepository, this._config);
    await seedDoctors(this.doctorRepository);
    // await seedServices(this.serviceRepository);
    // Call other seeder functions...
  }
}
