import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('sections')
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN')
  @Post()
  async create(@Body() dto: CreateSectionDto) {
    return this.sectionsService.create(dto);
  }

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN', 'STAFF', 'STUDENT', 'PARENT')
  @Get('level/:levelId')
  async findByLevel(@Param('levelId') levelId: string) {
    return this.sectionsService.findByLevel(levelId);
  }
}
