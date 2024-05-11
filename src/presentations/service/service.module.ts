import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { ServiceController } from './service.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [ServiceController],
})
export class ServiceModule {}
