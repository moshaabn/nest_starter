import { FaqM } from 'src/domains/model/faq';
import { FaqRepository } from 'src/domains/repositories/faq.repository';
import { CreateFaqDto } from 'src/presentations/faq/dto/create-faq.dto';

export class CreateFaqUseCases {
  constructor(private faqsRepository: FaqRepository) {}

  async execute(createFaqDto: CreateFaqDto): Promise<FaqM> {
    return this.faqsRepository.createFaq(createFaqDto);
  }
}
