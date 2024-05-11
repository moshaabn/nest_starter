import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [DoctorController],
})
export class DoctorModule {}
