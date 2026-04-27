import { Module } from '@nestjs/common';
import { RunsService } from './runs.service';
import { RunsResolver } from './runs.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [RunsResolver, RunsService],
  exports: [RunsService],
})
export class RunsModule {}
