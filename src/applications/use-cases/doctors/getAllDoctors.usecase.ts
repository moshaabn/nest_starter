import { DoctorM } from 'src/domains/model/doctor';
import { DoctorRepository } from 'src/domains/repositories/doctor.repository';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';
import { ActionResponse } from 'src/infrastructures/base/responses/action.response';
import { PageDto } from 'src/infrastructures/helpers/pagination/page.dto';

export class GetAllDoctorsUseCases {
  constructor(private doctorsRepository: DoctorRepository) {}

  async execute(
    req: PaginatedRequest,
  ): Promise<ActionResponse<PageDto<DoctorM>>> {
    return await this.doctorsRepository.getAllDoctors(req);
  }
}
