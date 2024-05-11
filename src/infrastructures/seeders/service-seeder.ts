import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';

export async function seedServices(serviceRepository: Repository<Service>) {
  for (let i = 1; i <= 12; i++) {
    const service = new Service();
    service.name_en = `Service ${i}`;
    service.name_ar = `خدمة ${i}`;
    service.short_details_en = `Service ${i} short details`;
    service.short_details_ar = `تفاصيل قصيرة للخدمة ${i}`;
    service.html_content_en = `Service ${i} html content`;
    service.html_content_ar = `محتوى HTML للخدمة ${i}`;
    service.image = 'https://via.placeholder.com/500';
    service.slug = `service-${i}`;
    await serviceRepository.save(service);
  }
}
