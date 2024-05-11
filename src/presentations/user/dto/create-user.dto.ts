import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'User email' })
  email: string;
  @ApiProperty({ type: String, description: 'User name' })
  name: string;
  @ApiProperty({ type: String, description: 'User password' })
  password: string;
}
