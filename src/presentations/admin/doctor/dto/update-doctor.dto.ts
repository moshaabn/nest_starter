import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty({ type: String, description: 'doctor name arabic' })
  name_ar: string;
  @ApiProperty({ type: String, description: 'doctor name english' })
  name_en: string;
  @ApiProperty({ type: String, description: 'doctor short details arabic' })
  short_details_ar: string;
  @ApiProperty({ type: String, description: 'doctor short details english' })
  short_details_en: string;
  @ApiProperty({ type: String, description: 'doctor html content arabic' })
  job_ar: string;
  @ApiProperty({ type: String, description: 'doctor html content english' })
  job_en: string;
  @ApiProperty({ type: String, description: 'doctor html content arabic' })
  address: string;
  @ApiProperty({ type: String, description: 'doctor html content english' })
  email: string;
  @ApiProperty({ type: String, description: 'doctor html content arabic' })
  website: string;
}
