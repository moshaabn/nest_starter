import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({ type: String, description: 'Question arabic' })
  question_ar: string;
  @ApiProperty({ type: String, description: 'Question english' })
  question_en: string;
  @ApiProperty({ type: String, description: 'Answer arabic' })
  answer_ar: string;
  @ApiProperty({ type: String, description: 'Answer english' })
  answer_en: string;
}
