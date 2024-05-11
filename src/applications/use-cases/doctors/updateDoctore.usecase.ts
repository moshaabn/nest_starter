import { DoctorM } from 'src/domains/model/doctor';
import { DoctorRepository } from 'src/domains/repositories/doctor.repository';
import { UpdateDoctorDto } from 'src/presentations/admin/doctor/dto/update-doctor.dto';

export class UpdateDoctorUseCases {
  constructor(private doctorsRepository: DoctorRepository) {}

  async execute(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<DoctorM> {
    return this.doctorsRepository.updateDoctor(id, updateDoctorDto);
  }
}
