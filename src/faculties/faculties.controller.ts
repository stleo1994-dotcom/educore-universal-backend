import { Controller, Post, Body } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('faculties')
export class FacultiesController {
  constructor(private facultiesService: FacultiesService) {}

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN')
  @Post()
  async create(@Body() dto: CreateFacultyDto) {
    return this.facultiesService.create(dto);
  }
}
