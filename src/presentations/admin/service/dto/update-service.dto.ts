import { ApiProperty } from '@nestjs/swagger';

export class UpdateServiceDto {
  @ApiProperty({ type: String, description: 'Service name arabic' })
  name_ar: string;
  @ApiProperty({ type: String, description: 'Service name english' })
  name_en: string;
  @ApiProperty({ type: String, description: 'Service short details arabic' })
  short_details_ar: string;
  @ApiProperty({ type: String, description: 'Service short details english' })
  short_details_en: string;
  @ApiProperty({ type: String, description: 'Service html content arabic' })
  html_content_ar: string;
  @ApiProperty({ type: String, description: 'Service html content english' })
  html_content_en: string;
}
