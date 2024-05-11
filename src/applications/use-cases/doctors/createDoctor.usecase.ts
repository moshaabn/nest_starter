import { DoctorM } from 'src/domains/model/doctor';
import { DoctorRepository } from 'src/domains/repositories/doctor.repository';
import { CreateDoctorDto } from 'src/presentations/admin/doctor/dto/create-doctor.dto';

export class CreateDoctorUseCases {
  constructor(private doctorsRepository: DoctorRepository) {}

  async execute(createDoctorDto: CreateDoctorDto): Promise<DoctorM> {
    return this.doctorsRepository.createDoctor(createDoctorDto);
  }
}
