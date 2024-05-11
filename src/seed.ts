// seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './infrastructures/seeders/seeder-service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  console.log('Seeding complete!');
  process.exit();
}

seed();
