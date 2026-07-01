import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSectionDto) {
    return this.prisma.section.create({
      data: {
        levelId: dto.levelId,
        name: dto.name,
      },
    });
  }

  async findByLevel(levelId: string) {
    return this.prisma.section.findMany({
      where: { levelId },
      orderBy: { name: 'asc' },
    });
  }
}
