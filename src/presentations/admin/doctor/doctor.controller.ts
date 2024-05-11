import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';
import { JwtAuthGuard } from 'src/infrastructures/middlewares/guards/jwt-auth.guard';
import { DeleteDoctorUseCases } from 'src/applications/use-cases/doctors/deleteDoctor.usecase';
import { GetAllDoctorsUseCases } from 'src/applications/use-cases/doctors/getAllDoctors.usecase';
import { CreateDoctorUseCases } from 'src/applications/use-cases/doctors/createDoctor.usecase';
import { UpdateDoctorUseCases } from 'src/applications/use-cases/doctors/updateDoctore.usecase';

@Controller('admin/doctors')
@ApiTags('AdminDoctors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminDoctorController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_DOCTORS_USE_CASE)
    private readonly getDoctorUsecaseProxy: UseCaseProxy<GetAllDoctorsUseCases>,
    @Inject(UsecaseProxyModule.CREATE_DOCTOR_USE_CASE)
    private readonly createDoctorUsecaseProxy: UseCaseProxy<CreateDoctorUseCases>,
    @Inject(UsecaseProxyModule.UPDATE_DOCTOR_USE_CASE)
    private readonly updateDoctorUsecaseProxy: UseCaseProxy<UpdateDoctorUseCases>,
    @Inject(UsecaseProxyModule.DELETE_DOCTOR_USE_CASE)
    private readonly deleteDoctorUsecaseProxy: UseCaseProxy<DeleteDoctorUseCases>,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get all doctors' })
  async getAllDoctors(@Query() query: PaginatedRequest) {
    const result = await this.getDoctorUsecaseProxy
      .getInstance()
      .execute(query);
    //make it paginated

    return result;
  }

  @Post('/')
  @ApiOperation({ summary: 'Create doctor' })
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    const {
      name_ar,
      name_en,
      short_details_ar,
      short_details_en,
      job_ar,
      job_en,
      address,
      email,
      website,
    } = createDoctorDto;
    const result = await this.createDoctorUsecaseProxy.getInstance().execute({
      name_ar,
      name_en,
      short_details_ar,
      short_details_en,
      job_ar,
      job_en,
      address,
      email,
      website,
    });
    return {
      status: 'Created',
      code: 201,
      message: 'Insert data success',
      data: result,
    };
  }

  //update

  @Post('/:id')
  @ApiOperation({ summary: 'Update doctor' })
  async updateDoctor(
    @Param('id') id: number,
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    const {
      name_ar,
      name_en,
      short_details_ar,
      short_details_en,
      job_ar,
      job_en,
      address,
      email,
      website,
    } = createDoctorDto;
    const result = await this.updateDoctorUsecaseProxy
      .getInstance()
      .execute(id, {
        name_ar,
        name_en,
        short_details_ar,
        short_details_en,
        job_ar,
        job_en,
        address,
        email,
        website,
      });
    return {
      status: 'Updated',
      code: 200,
      message: 'Update data success',
      data: result,
    };
  }
  //delete
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete doctor' })
  async deleteDoctor(@Param('id') id: string) {
    const result = await this.deleteDoctorUsecaseProxy
      .getInstance()
      .execute(parseInt(id));
    return {
      status: 'Deleted',
      code: 200,
      message: 'Delete data success',
    };
  }
}
