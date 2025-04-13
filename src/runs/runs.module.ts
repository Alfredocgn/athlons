import { Module } from '@nestjs/common';
import { RunsService } from './runs.service';
import { RunsResolver } from './runs.resolver';

@Module({
  providers: [RunsResolver, RunsService],
})
export class RunsModule {}
