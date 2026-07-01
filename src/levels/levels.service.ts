import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LicenseService } from '../institutions/license.service';
import { CreateLevelDto } from './dto/create-level.dto';

@Injectable()
export class LevelsService {
  constructor(
    private prisma: PrismaService,
    private licenseService: LicenseService,
  ) {}

  async create(dto: CreateLevelDto) {
    await this.licenseService.assertLicensed(dto.institutionId, dto.belongsTo);

    return this.prisma.level.create({
      data: {
        institutionId: dto.institutionId,
        name: dto.name,
        order: dto.order,
        belongsTo: dto.belongsTo as any,
      },
    });
  }

  async findByInstitution(institutionId: string) {
    return this.prisma.level.findMany({
      where: { institutionId },
      include: { sections: true },
      orderBy: { order: 'asc' },
    });
  }
}
