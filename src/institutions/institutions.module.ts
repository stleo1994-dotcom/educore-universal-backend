import { Module } from '@nestjs/common';
import { InstitutionsController } from './institutions.controller';
import { InstitutionsService } from './institutions.service';
import { LicenseService } from './license.service';

@Module({
  controllers: [InstitutionsController],
  providers: [InstitutionsService, LicenseService],
  exports: [LicenseService],
})
export class InstitutionsModule {}
