import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FaqM } from 'src/domains/model/faq';
import { FaqRepository } from 'src/domains/repositories/faq.repository';
import { Repository } from 'typeorm';
import { Faq } from '../entities/faq.entity';
import { CreateFaqDto } from 'src/presentations/faq/dto/create-faq.dto';

@Injectable()
export class FaqRepositoryOrm implements FaqRepository {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async getAllFaqs(): Promise<FaqM[]> {
    const faqs = await this.faqRepository.find();
    return faqs.map((faq) => this.toFaq(faq));
  }

  async createFaq(createFaqDto: CreateFaqDto): Promise<FaqM> {
    const faq = new Faq();
    faq.answer_ar = createFaqDto.answer_ar;
    faq.answer_en = createFaqDto.answer_en;
    faq.question_ar = createFaqDto.question_ar;
    faq.question_en = createFaqDto.question_en;
    return this.faqRepository.save(faq);
  }

  private toFaq(faqEntity: Faq): FaqM {
    const faq: FaqM = new FaqM();

    faq.id = faqEntity.id;
    faq.answer_ar = faqEntity.answer_ar;
    faq.answer_en = faqEntity.answer_en;
    faq.question_ar = faqEntity.question_ar;
    faq.question_en = faqEntity.question_en;

    return faq;
  }
}
