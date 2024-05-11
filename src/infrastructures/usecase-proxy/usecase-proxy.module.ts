import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepositoryOrm } from '../repositories/user.repository';
import { UseCaseProxy } from './usecase-proxy';
import { GetAllUserUseCases } from 'src/applications/use-cases/users/getAllUsers.usecase';
import { CreateUserUseCases } from 'src/applications/use-cases/users/createUser.usecase';
import { CreateServiceUseCases } from 'src/applications/use-cases/services/createService.usecase';
import { ServiceRepositoryOrm } from '../repositories/service.repository';
import { GetAllServicesUseCases } from 'src/applications/use-cases/services/getAllServices.usecase';
import { LoginUseCase } from 'src/applications/use-cases/auth/authLogin.usecase';
import { AuthRepositoryOrm } from '../repositories/auth.repository';
import { UpdateServiceUseCases } from 'src/applications/use-cases/services/updateService.usecase';
import { DeleteServiceUseCases } from 'src/applications/use-cases/services/deleteService.usecase';
import { CreateDoctorUseCases } from 'src/applications/use-cases/doctors/createDoctor.usecase';
import { DeleteDoctorUseCases } from 'src/applications/use-cases/doctors/deleteDoctor.usecase';
import { GetAllDoctorsUseCases } from 'src/applications/use-cases/doctors/getAllDoctors.usecase';
import { UpdateDoctorUseCases } from 'src/applications/use-cases/doctors/updateDoctore.usecase';
import { DoctorRepositoryOrm } from '../repositories/doctor.repository';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  static GET_ALL_SERVICES_USE_CASE = 'getAllServicesUsecaseProxy';
  static CREATE_SERVICE_USE_CASE = 'createServiceUsecaseProxy';
  static UPDATE_SERVICE_USE_CASE = 'updateServiceUsecaseProxy';
  static DELETE_SERVICE_USE_CASE = 'deleteServiceUsecaseProxy';
  static GET_ALL_DOCTORS_USE_CASE = 'getAllDoctorsUsecaseProxy';
  static CREATE_DOCTOR_USE_CASE = 'createDoctorUsecaseProxy';
  static UPDATE_DOCTOR_USE_CASE = 'updateDoctorUsecaseProxy';
  static DELETE_DOCTOR_USE_CASE = 'deleteDoctorUsecaseProxy';
  static LOGIN_USE_CASE = 'loginUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCases(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUseCases(userRepository)),
        },
        {
          inject: [ServiceRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_SERVICES_USE_CASE,
          useFactory: (serviceRepository: ServiceRepositoryOrm) =>
            new UseCaseProxy(new GetAllServicesUseCases(serviceRepository)),
        },
        {
          inject: [ServiceRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_SERVICE_USE_CASE,
          useFactory: (serviceRepository: ServiceRepositoryOrm) =>
            new UseCaseProxy(new CreateServiceUseCases(serviceRepository)),
        },
        {
          inject: [ServiceRepositoryOrm],
          provide: UsecaseProxyModule.UPDATE_SERVICE_USE_CASE,
          useFactory: (serviceRepository: ServiceRepositoryOrm) =>
            new UseCaseProxy(new UpdateServiceUseCases(serviceRepository)),
        },
        {
          inject: [ServiceRepositoryOrm],
          provide: UsecaseProxyModule.DELETE_SERVICE_USE_CASE,
          useFactory: (serviceRepository: ServiceRepositoryOrm) =>
            new UseCaseProxy(new DeleteServiceUseCases(serviceRepository)),
        },
        {
          inject: [DoctorRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_DOCTORS_USE_CASE,
          useFactory: (doctorRepository: DoctorRepositoryOrm) =>
            new UseCaseProxy(new GetAllDoctorsUseCases(doctorRepository)),
        },
        {
          inject: [DoctorRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_DOCTOR_USE_CASE,
          useFactory: (doctorRepository: DoctorRepositoryOrm) =>
            new UseCaseProxy(new CreateDoctorUseCases(doctorRepository)),
        },
        {
          inject: [DoctorRepositoryOrm],
          provide: UsecaseProxyModule.UPDATE_DOCTOR_USE_CASE,
          useFactory: (doctorRepository: DoctorRepositoryOrm) =>
            new UseCaseProxy(new UpdateDoctorUseCases(doctorRepository)),
        },
        {
          inject: [DoctorRepositoryOrm],
          provide: UsecaseProxyModule.DELETE_DOCTOR_USE_CASE,
          useFactory: (doctorRepository: DoctorRepositoryOrm) =>
            new UseCaseProxy(new DeleteDoctorUseCases(doctorRepository)),
        },
        {
          inject: [AuthRepositoryOrm],
          provide: UsecaseProxyModule.LOGIN_USE_CASE,
          useFactory: (authRepo: AuthRepositoryOrm) =>
            new UseCaseProxy(new LoginUseCase(authRepo)),
        },
        // Add your Faq use case providers...
      ],
      exports: [
        UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_USER_USE_CASE,
        UsecaseProxyModule.GET_ALL_SERVICES_USE_CASE,
        UsecaseProxyModule.CREATE_SERVICE_USE_CASE,
        UsecaseProxyModule.UPDATE_SERVICE_USE_CASE,
        UsecaseProxyModule.DELETE_SERVICE_USE_CASE,
        UsecaseProxyModule.GET_ALL_DOCTORS_USE_CASE,
        UsecaseProxyModule.CREATE_DOCTOR_USE_CASE,
        UsecaseProxyModule.UPDATE_DOCTOR_USE_CASE,
        UsecaseProxyModule.DELETE_DOCTOR_USE_CASE,
        UsecaseProxyModule.LOGIN_USE_CASE,
      ],
    };
  }
}
