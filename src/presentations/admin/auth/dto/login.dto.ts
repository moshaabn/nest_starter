import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({ type: String, description: 'Username' })
  username: string;
  @ApiProperty({ type: String, description: 'Password' })
  password: string;
}
