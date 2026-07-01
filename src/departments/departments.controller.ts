import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN')
  @Post()
  async create(@Body() dto: CreateDepartmentDto) {
    return this.departmentsService.create(dto);
  }

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN', 'STAFF', 'STUDENT', 'PARENT')
  @Get('faculty/:facultyId')
  async findByFaculty(@Param('facultyId') facultyId: string) {
    return this.departmentsService.findByFaculty(facultyId);
  }
}
