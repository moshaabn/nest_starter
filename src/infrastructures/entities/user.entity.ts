import { Column, Entity, Index } from 'typeorm';
import { AuditableEntity } from '../base/auditable-entity';
import { Role } from 'src/domains/enums/role.enum';

@Entity('users')
export class User extends AuditableEntity {
  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'varchar', enum: Role, default: Role.CLIENT })
  role: Role;
}
