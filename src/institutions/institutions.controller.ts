import { Controller, Post, Get, Body } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('institutions')
export class InstitutionsController {
  constructor(private institutionsService: InstitutionsService) {}

  @Roles('PLATFORM_ADMIN')
  @Post()
  async create(@Body() dto: CreateInstitutionDto) {
    return this.institutionsService.create(dto);
  }

  @Roles('PLATFORM_ADMIN')
  @Get()
  async findAll() {
    return this.institutionsService.findAll();
  }
}
