import { FaqM } from 'src/domains/model/faq';
import { FaqRepository } from 'src/domains/repositories/faq.repository';

export class GetAllFaqUseCases {
  constructor(private faqsRepository: FaqRepository) {}

  async execute(): Promise<FaqM[]> {
    return await this.faqsRepository.getAllFaqs();
  }
}
