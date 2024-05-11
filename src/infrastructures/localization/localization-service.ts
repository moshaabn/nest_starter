import { Inject, Injectable, Scope } from '@nestjs/common';
import { Lang } from './providers/language-provider';

@Injectable({ scope: Scope.REQUEST })
export class LocalizationService {
  constructor(@Inject(Lang) private readonly lang: string) {}

  getLocalizedName(name_en: string, name_ar: string): string {
    return this.lang === 'ar' ? name_ar : name_en;
  }
}
