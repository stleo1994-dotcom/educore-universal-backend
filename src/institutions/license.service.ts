import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LicenseService {
  constructor(private prisma: PrismaService) {}

  async assertLicensed(institutionId: string, requiredType: string) {
    const license = await this.prisma.institutionLicense.findUnique({
      where: {
        institutionId_type: {
          institutionId: institutionId,
          type: requiredType as any,
        },
      },
    });

    if (!license) {
      throw new ForbiddenException(
        `This institution is not licensed for ${requiredType}. Contact the platform administrator to upgrade your contract.`,
      );
    }

    return license;
  }
}
