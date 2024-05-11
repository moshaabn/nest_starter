import { AuthDto } from 'src/presentations/auth/dto/auth.dto';
import { UserM } from '../model/user';
import { LoginDto } from 'src/presentations/auth/dto/login.dto';

export interface AuthRepository {
  login(loginDto: LoginDto): Promise<AuthDto>;
}
