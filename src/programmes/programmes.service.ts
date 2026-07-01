import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';

@Injectable()
export class ProgrammesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProgrammeDto) {
    return this.prisma.programme.create({
      data: {
        departmentId: dto.departmentId,
        name: dto.name,
      },
    });
  }

  async findByDepartment(departmentId: string) {
    return this.prisma.programme.findMany({
      where: { departmentId },
      orderBy: { name: 'asc' },
    });
  }
}
