import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInstitutionDto) {
    const existing = await this.prisma.institution.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new ConflictException('An institution with this slug already exists');
    }

    const institution = await this.prisma.institution.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        licenses: {
          create: dto.licensedTypes.map((type) => ({ type: type as any })),
        },
      },
      include: {
        licenses: true,
      },
    });

    return institution;
  }

  async findAll() {
    return this.prisma.institution.findMany({
      include: { licenses: true },
    });
  }
}
