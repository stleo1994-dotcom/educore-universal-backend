import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProgrammesService } from './programmes.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('programmes')
export class ProgrammesController {
  constructor(private programmesService: ProgrammesService) {}

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN')
  @Post()
  async create(@Body() dto: CreateProgrammeDto) {
    return this.programmesService.create(dto);
  }

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN', 'STAFF', 'STUDENT', 'PARENT')
  @Get('department/:departmentId')
  async findByDepartment(@Param('departmentId') departmentId: string) {
    return this.programmesService.findByDepartment(departmentId);
  }
}
