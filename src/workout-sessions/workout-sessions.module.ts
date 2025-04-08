import { Module } from '@nestjs/common';
import { WorkoutSessionsService } from './workout-sessions.service';
import { WorkoutSessionsResolver } from './workout-sessions.resolver';

@Module({
  providers: [WorkoutSessionsResolver, WorkoutSessionsService],
})
export class WorkoutSessionsModule {}
