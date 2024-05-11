import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { AdminServiceController } from './service.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
