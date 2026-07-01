import { Module } from '@nestjs/common';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';
import { InstitutionsModule } from '../institutions/institutions.module';

@Module({
  imports: [InstitutionsModule],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
