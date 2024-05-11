import { ServiceM } from 'src/domains/model/service';
import { ServiceRepository } from 'src/domains/repositories/service.repository';
import { UpdateServiceDto } from 'src/presentations/admin/service/dto/update-service.dto';

export class UpdateServiceUseCases {
  constructor(private servicesRepository: ServiceRepository) {}

  async execute(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceM> {
    return this.servicesRepository.updateService(id, updateServiceDto);
  }
}
