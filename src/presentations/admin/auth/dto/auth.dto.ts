import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateUserDto } from 'src/presentations/user/dto/create-user.dto';

export class AdminAuthDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @Expose()
  access_token: string;
}
