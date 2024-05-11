import { Column, Entity, ManyToOne } from 'typeorm';
import { AuditableEntity } from '../base/auditable-entity';
import { Service } from './service.entity';

@Entity('service_images')
export class ServiceImage extends AuditableEntity {
  @Column('varchar')
  image: string;

  //one to many relationship with service
  @Column('int')
  service_id: number;

  @ManyToOne(() => Service, (service) => service.service_images)
  service: Service;
}
