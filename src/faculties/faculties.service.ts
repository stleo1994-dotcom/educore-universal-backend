import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LicenseService } from '../institutions/license.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';

@Injectable()
export class FacultiesService {
  constructor(
    private prisma: PrismaService,
    private licenseService: LicenseService,
  ) {}

  async create(dto: CreateFacultyDto) {
    await this.licenseService.assertLicensed(dto.institutionId, 'UNIVERSITY');

    return this.prisma.faculty.create({
      data: {
        institutionId: dto.institutionId,
        name: dto.name,
      },
    });
  }
}
