import { AuditableEntity } from './auditable-entity';

export class LocalizableEntity extends AuditableEntity {
  getLocalizedName(name_en: string, name_ar: string, lang: string): string {
    return lang === 'ar' ? name_ar : name_en;
  }
}
