import { Column, Entity, OneToMany } from 'typeorm';
import { ServiceImage } from './image.entity';
import { LocalizableEntity } from '../base/localizable-entity';

@Entity('services')
export class Service extends LocalizableEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column('varchar')
  name_ar: string;

  @Column('varchar')
  name_en: string;

  @Column('varchar')
  short_details_ar: string;

  @Column('varchar')
  short_details_en: string;

  @Column('varchar')
  html_content_ar: string;

  @Column('varchar')
  html_content_en: string;

  @Column('varchar')
  image: string;

  @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.service)
  service_images: ServiceImage[];

  getName(lang: string): string {
    return this.getLocalizedName(this.name_en, this.name_ar, lang);
  }

  getShortDetails(lang: string): string {
    return this.getLocalizedName(
      this.short_details_en,
      this.short_details_ar,
      lang,
    );
  }

  getHtmlContent(lang: string): string {
    return this.getLocalizedName(
      this.html_content_en,
      this.html_content_ar,
      lang,
    );
  }
}
