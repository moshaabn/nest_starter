import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

export async function seedDoctors(doctorRepository: Repository<Doctor>) {
  for (let i = 1; i <= 12; i++) {
    const doctor = new Doctor();
    doctor.name_en = `Doctor ${i}`;
    doctor.name_ar = `دكتور ${i}`;
    doctor.short_details_en = `Doctor ${i} short details`;
    doctor.short_details_ar = `تفاصيل قصيرة للدكتور ${i}`;
    doctor.job_en = `Doctor ${i} job`;
    doctor.job_ar = `وظيفة الدكتور ${i}`;
    doctor.address = `Doctor ${i} address`;
    doctor.email = `doctor${i}@homogene.com`;
    doctor.website = `https://doctor${i}.com`;
    doctor.image = 'https://via.placeholder.com/500';
    doctor.slug = `doctor-${i}`;
    await doctorRepository.save(doctor);
  }
}
