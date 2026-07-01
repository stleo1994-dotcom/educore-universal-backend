import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { FacultiesModule } from './faculties/faculties.module';
import { LevelsModule } from './levels/levels.module';
import { SectionsModule } from './sections/sections.module';
import { DepartmentsModule } from './departments/departments.module';
import { ProgrammesModule } from './programmes/programmes.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    InstitutionsModule,
    FacultiesModule,
    LevelsModule,
    SectionsModule,
    DepartmentsModule,
    ProgrammesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
