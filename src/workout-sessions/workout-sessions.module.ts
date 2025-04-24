import { Module } from '@nestjs/common';
import { WorkoutSessionsService } from './workout-sessions.service';
import { WorkoutSessionsResolver } from './workout-sessions.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [WorkoutSessionsResolver, WorkoutSessionsService],
  imports: [PrismaModule, UsersModule, SharedModule],
  exports: [WorkoutSessionsService],
})
export class WorkoutSessionsModule {}
