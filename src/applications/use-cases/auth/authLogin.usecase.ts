import { UserM } from 'src/domains/model/user';
import { AuthRepository } from 'src/domains/repositories/auth.repository';
import { AuthDto } from 'src/presentations/auth/dto/auth.dto';
import { LoginDto } from 'src/presentations/auth/dto/login.dto';

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(loginDto: LoginDto): Promise<AuthDto> {
    return this.authRepo.login(loginDto);
  }
}
