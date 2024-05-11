import { ServiceM } from 'src/domains/model/service';
import { ServiceRepository } from 'src/domains/repositories/service.repository';
import { CreateServiceDto } from 'src/presentations/admin/service/dto/create-service.dto';

export class CreateServiceUseCases {
  constructor(private servicesRepository: ServiceRepository) {}

  async execute(createServiceDto: CreateServiceDto): Promise<ServiceM> {
    return this.servicesRepository.createService(createServiceDto);
  }
}
