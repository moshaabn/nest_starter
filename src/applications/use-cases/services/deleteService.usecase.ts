import { ServiceM } from 'src/domains/model/service';
import { ServiceRepository } from 'src/domains/repositories/service.repository';

export class DeleteServiceUseCases {
  constructor(private servicesRepository: ServiceRepository) {}

  async execute(id: number): Promise<ServiceM> {
    return this.servicesRepository.deleteService(id);
  }
}
