import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorM } from 'src/domains/model/doctor';
import { Repository } from 'typeorm';
import { PaginatedRequest } from '../base/requests/paginated.request';
import { PageMetaDto } from '../helpers/pagination/page-meta.dto';
import { PageDto } from '../helpers/pagination/page.dto';
import { ActionResponse } from '../base/responses/action.response';
import { DoctorRepository } from 'src/domains/repositories/doctor.repository';
import { CreateDoctorDto } from 'src/presentations/admin/doctor/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/presentations/admin/doctor/dto/update-doctor.dto';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorRepositoryOrm implements DoctorRepository {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async getAllDoctors(
    req: PaginatedRequest,
  ): Promise<ActionResponse<PageDto<DoctorM>>> {
    // const doctors = await this.doctorRepository.find();
    //get doctors paginated
    const [page, limit] = [req.page, req.limit];
    const query = this.doctorRepository
      .createQueryBuilder('doctors')
      .orderBy('doctors.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    const [doctors, total] = await query.getManyAndCount();
    const result = doctors.map((doctor) => this.toDoctor(doctor));

    const pageMetaDto = new PageMetaDto(page, limit, total);
    const pageDto = new PageDto(result, pageMetaDto);

    return new ActionResponse(pageDto);
  }

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<DoctorM> {
    const doctor = new Doctor();
    doctor.name_ar = createDoctorDto.name_ar;
    doctor.name_en = createDoctorDto.name_en;
    doctor.short_details_ar = createDoctorDto.short_details_ar;
    doctor.short_details_en = createDoctorDto.short_details_en;
    doctor.job_ar = createDoctorDto.job_ar;
    doctor.job_en = createDoctorDto.job_en;
    doctor.address = createDoctorDto.address;
    doctor.email = createDoctorDto.email;
    doctor.website = createDoctorDto.website;
    return this.doctorRepository.save(doctor);
  }
  async updateDoctor(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<DoctorM> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    doctor.name_ar = updateDoctorDto.name_ar;
    doctor.name_en = updateDoctorDto.name_en;
    doctor.short_details_ar = updateDoctorDto.short_details_ar;
    doctor.short_details_en = updateDoctorDto.short_details_en;
    doctor.job_ar = updateDoctorDto.job_ar;
    doctor.job_en = updateDoctorDto.job_en;
    doctor.address = updateDoctorDto.address;
    doctor.email = updateDoctorDto.email;
    doctor.website = updateDoctorDto.website;

    return this.doctorRepository.save(doctor);
  }

  async deleteDoctor(id: number): Promise<DoctorM> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return this.doctorRepository.remove(doctor);
  }

  private toDoctor(doctorEntity: Doctor): DoctorM {
    const doctor: DoctorM = new DoctorM();

    doctor.id = doctorEntity.id;
    doctor.name_ar = doctorEntity.name_ar;
    doctor.name_en = doctorEntity.name_en;
    doctor.short_details_ar = doctorEntity.short_details_ar;
    doctor.short_details_en = doctorEntity.short_details_en;
    doctor.job_ar = doctorEntity.job_ar;
    doctor.job_en = doctorEntity.job_en;
    doctor.address = doctorEntity.address;
    doctor.email = doctorEntity.email;
    doctor.website = doctorEntity.website;

    return doctor;
  }
}
