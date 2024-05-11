import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/domains/config/app.interface';

@Injectable()
export class AppConfigService implements AppConfig {
  constructor(private configService: ConfigService) {}
  getAppSecretSync(): string {
    return this.configService.get<string>('APP_KEY');
  }
}
