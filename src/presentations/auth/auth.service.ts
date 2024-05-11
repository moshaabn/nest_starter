// import { Injectable, Inject, BadRequestException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/infrastructures/entities/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     @Inject(JwtService) private readonly jwtService: JwtService,
//     @Inject(ConfigService) private readonly _config: ConfigService,
//   ) {}

//   async login(user: any) {
//     if (!user) throw new BadRequestException('message.invalid_credentials');
//     const payload = { username: user.username, sub: user.id };
//     return {
//       ...user,
//       role: user.roles[0],
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   //change password
//   async changePassword(user: User, oldPassword: string, newPassword: string) {
//     const isMatch = await bcrypt.compare(
//       oldPassword + this._config.get('app.key'),
//       user.password,
//     );
//     if (!isMatch) throw new BadRequestException('message.invalid_credentials');
//     user.password = await bcrypt.hash(
//       newPassword + this._config.get('app.key'),
//       10,
//     );
//     await this.usersService.update(user);
//     return this.login(user);
//   }
//   //reset password
//   async resetPassword(user: UserEntity, newPassword: string) {
//     if (user == undefined) throw new BadRequestException('message.not_found');
//     user.password = await bcrypt.hash(
//       newPassword + this._config.get('app.key'),
//       10,
//     );
//     await this.usersService.update(user);
//     return this.login(user);
//   }
//   async updateInfo(user: UserEntity) {
//     await this.usersService.update(user);
//     return this.login(user);
//   }
//   async changePhone(phone: string, user: UserEntity) {
//     const code = await this.sendOtpTransaction.run({
//       username: phone,
//       role: user.roles[0],
//       type: 'phone',
//     });
//     return true;
//   }

//   async getUserFromPayload(payload: any) {
//     return payload;
//   }
// }
