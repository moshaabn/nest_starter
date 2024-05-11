import * as bcrypt from 'bcrypt';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/login.dto';
import { GetAllUserUseCases } from 'src/applications/use-cases/users/getAllUsers.usecase';
import { LoginUseCase } from 'src/applications/use-cases/auth/authLogin.usecase';

@Controller('admin/auth')
@ApiTags('Admin Auth')
export class AdminAuthController {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USE_CASE)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCase>,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'login admin' })
  async createUser(@Body() AdminloginDto: AdminLoginDto) {
    const { username, password } = AdminloginDto;
    const result = await this.loginUseCaseProxy.getInstance().execute({
      username: username,
      password: password,
    });
    return {
      status: 'Success',
      code: 200,
      message: 'Login success',
      data: result,
    };
  }
}
