import { Column, Entity } from 'typeorm';
import { LocalizationService } from '../localization/localization-service';
import { AuditableEntity } from '../base/auditable-entity';

@Entity('contents')
export class Content extends AuditableEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column('varchar')
  title_ar: string;

  @Column('varchar')
  title_en: string;

  @Column('varchar')
  content_ar: string;

  @Column('varchar')
  content_en: string;

  @Column('varchar')
  image: string;

  constructor(private localizationService: LocalizationService) {
    super();
  }

  getTitle(): string {
    return this.localizationService.getLocalizedName(
      this.title_en,
      this.title_ar,
    );
  }

  getContent(): string {
    return this.localizationService.getLocalizedName(
      this.content_en,
      this.content_ar,
    );
  }
}
