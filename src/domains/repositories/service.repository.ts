import { ServiceM } from '../model/service';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';
import { ActionResponse } from 'src/infrastructures/base/responses/action.response';
import { PageDto } from 'src/infrastructures/helpers/pagination/page.dto';
import { CreateServiceDto } from 'src/presentations/admin/service/dto/create-service.dto';
import { UpdateServiceDto } from 'src/presentations/admin/service/dto/update-service.dto';

export interface ServiceRepository {
  createService(createServiceDto: CreateServiceDto): Promise<ServiceM>;
  updateService(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceM>;
  deleteService(id: number): Promise<ServiceM>;
  getAllServices(
    req: PaginatedRequest,
  ): Promise<ActionResponse<PageDto<ServiceM>>>;
}
