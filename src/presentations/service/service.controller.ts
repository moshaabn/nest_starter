import * as bcrypt from 'bcrypt';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllServicesUseCases } from 'src/applications/use-cases/services/getAllServices.usecase';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';

@Controller('services')
@ApiTags('Services')
// @UseGuards(JwtAuthGuard)
// @Roles(Role.CLIENT, Role.DRIVER)
export class ServiceController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_SERVICES_USE_CASE)
    private readonly getServiceUsecaseProxy: UseCaseProxy<GetAllServicesUseCases>,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get all services' })
  async getAllServices(@Query() query: PaginatedRequest) {
    const result = await this.getServiceUsecaseProxy
      .getInstance()
      .execute(query);
    //make it paginated

    return {
      status: 'OK',
      code: 200,
      message: 'Get data success',
      data: result,
    };
  }
}
