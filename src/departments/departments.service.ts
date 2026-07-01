import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: {
        facultyId: dto.facultyId,
        name: dto.name,
      },
    });
  }

  async findByFaculty(facultyId: string) {
    return this.prisma.department.findMany({
      where: { facultyId },
      include: { programmes: true },
      orderBy: { name: 'asc' },
    });
  }
}
