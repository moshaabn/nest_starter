import { CreateFaqDto } from 'src/presentations/faq/dto/create-faq.dto';
import { FaqM } from '../model/faq';

export interface FaqRepository {
  createFaq(createFaqDto: CreateFaqDto): Promise<FaqM>;
  getAllFaqs(): Promise<FaqM[]>;
}
