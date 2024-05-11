import { ServiceM } from 'src/domains/model/service';
import { ServiceRepository } from 'src/domains/repositories/service.repository';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';
import { ActionResponse } from 'src/infrastructures/base/responses/action.response';
import { PageDto } from 'src/infrastructures/helpers/pagination/page.dto';

export class GetAllServicesUseCases {
  constructor(private servicesRepository: ServiceRepository) {}

  async execute(
    req: PaginatedRequest,
  ): Promise<ActionResponse<PageDto<ServiceM>>> {
    return await this.servicesRepository.getAllServices(req);
  }
}
