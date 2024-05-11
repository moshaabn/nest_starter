import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceM } from 'src/domains/model/service';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { ServiceRepository } from 'src/domains/repositories/service.repository';
import { PaginatedRequest } from '../base/requests/paginated.request';
import { PageMetaDto } from '../helpers/pagination/page-meta.dto';
import { PageDto } from '../helpers/pagination/page.dto';
import { ActionResponse } from '../base/responses/action.response';
import { CreateServiceDto } from 'src/presentations/admin/service/dto/create-service.dto';
import { UpdateServiceDto } from 'src/presentations/admin/service/dto/update-service.dto';

@Injectable()
export class ServiceRepositoryOrm implements ServiceRepository {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async getAllServices(
    req: PaginatedRequest,
  ): Promise<ActionResponse<PageDto<ServiceM>>> {
    // const services = await this.serviceRepository.find();
    //get services paginated
    const [page, limit] = [req.page, req.limit];
    const query = this.serviceRepository
      .createQueryBuilder('services')
      .orderBy('services.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    const [services, total] = await query.getManyAndCount();
    const result = services.map((service) => this.toService(service));

    const pageMetaDto = new PageMetaDto(page, limit, total);
    const pageDto = new PageDto(result, pageMetaDto);

    return new ActionResponse(pageDto);
  }

  async createService(createServiceDto: CreateServiceDto): Promise<ServiceM> {
    const service = new Service();
    service.name_ar = createServiceDto.name_ar;
    service.name_en = createServiceDto.name_en;
    service.short_details_ar = createServiceDto.short_details_ar;
    service.short_details_en = createServiceDto.short_details_en;
    service.html_content_ar = createServiceDto.html_content_ar;
    service.html_content_en = createServiceDto.html_content_en;
    return this.serviceRepository.save(service);
  }
  async updateService(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceM> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    service.name_ar = updateServiceDto.name_ar;
    service.name_en = updateServiceDto.name_en;
    service.short_details_ar = updateServiceDto.short_details_ar;
    service.short_details_en = updateServiceDto.short_details_en;
    service.html_content_ar = updateServiceDto.html_content_ar;
    service.html_content_en = updateServiceDto.html_content_en;

    return this.serviceRepository.save(service);
  }

  async deleteService(id: number): Promise<ServiceM> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return this.serviceRepository.remove(service);
  }

  private toService(serviceEntity: Service): ServiceM {
    const service: ServiceM = new ServiceM();

    service.id = serviceEntity.id;
    service.name_ar = serviceEntity.name_ar;
    service.name_en = serviceEntity.name_en;
    service.short_details_ar = serviceEntity.short_details_ar;
    service.short_details_en = serviceEntity.short_details_en;
    service.html_content_ar = serviceEntity.html_content_ar;
    service.html_content_en = serviceEntity.html_content_en;

    return service;
  }
}
