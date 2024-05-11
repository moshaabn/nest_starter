import { Column, Entity } from 'typeorm';
import { LocalizableEntity } from '../base/localizable-entity';

@Entity('faqs')
export class Faq extends LocalizableEntity {
  @Column('varchar')
  question_ar: string;

  @Column('varchar')
  question_en: string;

  @Column('varchar')
  answer_ar: string;

  @Column('varchar')
  answer_en: string;

  getQuestion(lang: string): string {
    return this.getLocalizedName(this.question_en, this.question_ar, lang);
  }

  getAnswer(lang: string): string {
    return this.getLocalizedName(this.answer_en, this.answer_ar, lang);
  }
}
