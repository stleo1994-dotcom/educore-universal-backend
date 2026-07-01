import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('levels')
export class LevelsController {
  constructor(private levelsService: LevelsService) {}

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN')
  @Post()
  async create(@Body() dto: CreateLevelDto) {
    return this.levelsService.create(dto);
  }

  @Roles('PLATFORM_ADMIN', 'INSTITUTION_ADMIN', 'STAFF', 'STUDENT', 'PARENT')
  @Get('institution/:institutionId')
  async findByInstitution(@Param('institutionId') institutionId: string) {
    return this.levelsService.findByInstitution(institutionId);
  }
}
