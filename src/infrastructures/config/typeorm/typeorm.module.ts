import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { User } from 'src/infrastructures/entities/user.entity';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [__dirname + './../../entities/*.entity.ts'],
    autoLoadEntities: true,
    synchronize: config.getDatabaseSync(),
    schema: process.env.DATABASE_SCHEMA,
    migrationsRun: true,
    // migrations: [__dirname + '/migrations**/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',
    cli: {
      migrationsDir: 'src/migrations',
    },
  } as TypeOrmModuleOptions);
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
