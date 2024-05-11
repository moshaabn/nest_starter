import * as bcrypt from 'bcrypt';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';
import { GetAllDoctorsUseCases } from 'src/applications/use-cases/doctors/getAllDoctors.usecase';

@Controller('doctors')
@ApiTags('Doctors')
// @UseGuards(JwtAuthGuard)
// @Roles(Role.CLIENT, Role.DRIVER)
export class DoctorController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_DOCTORS_USE_CASE)
    private readonly getDoctorUsecaseProxy: UseCaseProxy<GetAllDoctorsUseCases>,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get all doctors' })
  async getAllDoctors(@Query() query: PaginatedRequest) {
    const result = await this.getDoctorUsecaseProxy
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
