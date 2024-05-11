import * as bcrypt from 'bcrypt';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCases } from 'src/applications/use-cases/users/createUser.usecase';
import { GetAllUserUseCases } from 'src/applications/use-cases/users/getAllUsers.usecase';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/infrastructures/middlewares/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructures/middlewares/guards/roles.guard';
import { Role } from 'src/domains/enums/role.enum';
import { Roles } from 'src/domains/decorators/roles.decorator';

@Controller('users')
@ApiTags('Users')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.CLIENT, Role.DRIVER)
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetAllUserUseCases>,
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCases>,
  ) {}

  @ApiBearerAuth()
  @Get('')
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    const result = await this.getUserUsecaseProxy.getInstance().execute();
    return {
      status: 'OK',
      code: 200,
      message: 'Get data success',
      data: result,
    };
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.createUserUsecaseProxy.getInstance().execute({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return {
      status: 'Created',
      code: 201,
      message: 'Insert data success',
      data: result,
    };
  }
}
