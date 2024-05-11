import { DoctorM } from 'src/domains/model/doctor';
import { DoctorRepository } from 'src/domains/repositories/doctor.repository';

export class DeleteDoctorUseCases {
  constructor(private doctorsRepository: DoctorRepository) {}

  async execute(id: number): Promise<DoctorM> {
    return this.doctorsRepository.deleteDoctor(id);
  }
}
