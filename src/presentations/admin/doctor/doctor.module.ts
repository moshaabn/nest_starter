import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { AdminDoctorController } from './doctor.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [AdminDoctorController],
})
export class AdminDoctorModule {}
