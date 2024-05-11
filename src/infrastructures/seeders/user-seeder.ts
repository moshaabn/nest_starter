import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from 'src/domains/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export async function seedUsers(
  userRepository: Repository<User>,
  configService: ConfigService,
) {
  const user = new User();
  user.name = 'Admin';
  user.email = 'admin@example.com';
  user.role = Role.ADMIN;
  console.log('APP_KEY', configService.get<string>('APP_KEY'));
  const salt = await bcrypt.genSalt();

  user.password = await bcrypt.hash(
    'P@ssword123' + configService.get<string>('APP_KEY'),
    salt,
  );
  // Set other properties...

  await userRepository.save(user);
}
