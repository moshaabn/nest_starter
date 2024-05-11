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
import { CreateServiceDto } from './dto/create-service.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllServicesUseCases } from 'src/applications/use-cases/services/getAllServices.usecase';
import { CreateServiceUseCases } from 'src/applications/use-cases/services/createService.usecase';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';
import { JwtAuthGuard } from 'src/infrastructures/middlewares/guards/jwt-auth.guard';
import { UpdateServiceUseCases } from 'src/applications/use-cases/services/updateService.usecase';
import { DeleteServiceUseCases } from 'src/applications/use-cases/services/deleteService.usecase';

@Controller('admin/services')
@ApiTags('AdminServices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminServiceController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_SERVICES_USE_CASE)
    private readonly getServiceUsecaseProxy: UseCaseProxy<GetAllServicesUseCases>,
    @Inject(UsecaseProxyModule.CREATE_SERVICE_USE_CASE)
    private readonly createServiceUsecaseProxy: UseCaseProxy<CreateServiceUseCases>,
    @Inject(UsecaseProxyModule.UPDATE_SERVICE_USE_CASE)
    private readonly updateServiceUsecaseProxy: UseCaseProxy<UpdateServiceUseCases>,
    @Inject(UsecaseProxyModule.DELETE_SERVICE_USE_CASE)
    private readonly deleteServiceUsecaseProxy: UseCaseProxy<DeleteServiceUseCases>,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get all services' })
  async getAllServices(@Query() query: PaginatedRequest) {
    const result = await this.getServiceUsecaseProxy
      .getInstance()
      .execute(query);
    //make it paginated

    return result;
  }

  @Post('/')
  @ApiOperation({ summary: 'Create service' })
  async createService(@Body() createServiceDto: CreateServiceDto) {
    const {
      name_ar,
      name_en,
      html_content_ar,
      html_content_en,
      short_details_ar,
      short_details_en,
    } = createServiceDto;
    const result = await this.createServiceUsecaseProxy.getInstance().execute({
      name_ar,
      name_en,
      html_content_ar,
      html_content_en,
      short_details_ar,
      short_details_en,
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
  @ApiOperation({ summary: 'Update service' })
  async updateService(
    @Param('id') id: number,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    const {
      name_ar,
      name_en,
      html_content_ar,
      html_content_en,
      short_details_ar,
      short_details_en,
    } = createServiceDto;
    const result = await this.updateServiceUsecaseProxy
      .getInstance()
      .execute(id, {
        name_ar,
        name_en,
        html_content_ar,
        html_content_en,
        short_details_ar,
        short_details_en,
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
  @ApiOperation({ summary: 'Delete service' })
  async deleteService(@Param('id') id: string) {
    const result = await this.deleteServiceUsecaseProxy
      .getInstance()
      .execute(parseInt(id));
    return {
      status: 'Deleted',
      code: 200,
      message: 'Delete data success',
    };
  }
}
