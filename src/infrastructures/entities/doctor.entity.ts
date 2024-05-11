import { Column, Entity } from 'typeorm';
import { LocalizableEntity } from '../base/localizable-entity';

@Entity('doctors')
export class Doctor extends LocalizableEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column('varchar')
  name_ar: string;

  @Column('varchar')
  name_en: string;

  @Column('varchar')
  job_ar: string;

  @Column('varchar')
  job_en: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  short_details_ar: string;

  @Column('varchar')
  short_details_en: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  website: string;

  getName(lang: string): string {
    return this.getLocalizedName(this.name_en, this.name_ar, lang);
  }

  getContent(lang: string): string {
    return this.getLocalizedName(
      this.short_details_en,
      this.short_details_ar,
      lang,
    );
  }

  getJob(lang: string): string {
    return this.getLocalizedName(this.job_en, this.job_ar, lang);
  }
}
