import { Module } from '@nestjs/common';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';
import { InstitutionsModule } from '../institutions/institutions.module';

@Module({
  imports: [InstitutionsModule],
  controllers: [FacultiesController],
  providers: [FacultiesService],
})
export class FacultiesModule {}
