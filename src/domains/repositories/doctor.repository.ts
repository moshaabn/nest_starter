import { DoctorM } from '../model/doctor';
import { PaginatedRequest } from 'src/infrastructures/base/requests/paginated.request';
import { ActionResponse } from 'src/infrastructures/base/responses/action.response';
import { PageDto } from 'src/infrastructures/helpers/pagination/page.dto';
import { CreateDoctorDto } from 'src/presentations/admin/doctor/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/presentations/admin/doctor/dto/update-doctor.dto';

export interface DoctorRepository {
  createDoctor(createDoctorDto: CreateDoctorDto): Promise<DoctorM>;
  updateDoctor(id: number, updateDoctorDto: UpdateDoctorDto): Promise<DoctorM>;
  deleteDoctor(id: number): Promise<DoctorM>;
  getAllDoctors(
    req: PaginatedRequest,
  ): Promise<ActionResponse<PageDto<DoctorM>>>;
}
