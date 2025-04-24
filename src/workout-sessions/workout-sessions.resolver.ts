import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Root,
  ResolveField,
} from '@nestjs/graphql';
import { WorkoutSessionsService } from './workout-sessions.service';
import { WorkoutSession } from './entities/workout-session.entity';
import { CreateWorkoutSessionInput } from './dto/create-workout-session.input';
import { UpdateWorkoutSessionInput } from './dto/update-workout-session.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { WorkoutSessionFilters } from './dto/workout-session-filters.dto';
import { WorkoutSessionStats } from './entities/workout-session-stats.entity';
import { Run } from 'src/runs/entities/run.entity';
import { RelationshipsService } from 'src/shared/relationships/relationships.service';

@Resolver(() => WorkoutSession)
export class WorkoutSessionsResolver {
  constructor(
    private readonly workoutSessionsService: WorkoutSessionsService,
    private readonly relationshipsService: RelationshipsService,
  ) {}

  @Mutation(() => WorkoutSession)
  @UseGuards(GqlAuthGuard)
  createWorkoutSession(
    @CurrentUser() currentUser: User,
    @Args('createWorkoutSessionInput')
    createWorkoutSessionInput: CreateWorkoutSessionInput,
  ) {
    return this.workoutSessionsService.create(
      createWorkoutSessionInput,
      currentUser.id,
    );
  }

  @Query(() => [WorkoutSession], { name: 'workoutSessions' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @CurrentUser() currentUser: User,
    @Args('filters', { nullable: true }) filters?: WorkoutSessionFilters,
  ) {
    return this.workoutSessionsService.findAll(currentUser.id, filters);
  }

  @Query(() => WorkoutSession, { name: 'workoutSession' })
  @UseGuards(GqlAuthGuard)
  findOne(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.workoutSessionsService.findOne(id, currentUser.id);
  }

  @Mutation(() => WorkoutSession)
  @UseGuards(GqlAuthGuard)
  updateWorkoutSession(
    @CurrentUser() currentUser: User,
    @Args('updateWorkoutSessionInput')
    updateWorkoutSessionInput: UpdateWorkoutSessionInput,
  ) {
    return this.workoutSessionsService.update(
      updateWorkoutSessionInput.id,
      updateWorkoutSessionInput,
      currentUser.id,
    );
  }

  @Mutation(() => WorkoutSession)
  @UseGuards(GqlAuthGuard)
  removeWorkoutSession(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.workoutSessionsService.remove(id, currentUser.id);
  }

  @Query(() => WorkoutSessionStats)
  @UseGuards(GqlAuthGuard)
  getWorkoutStats(
    @CurrentUser() currentUser: User,
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.workoutSessionsService.getStats(
      currentUser.id,
      startDate,
      endDate,
    );
  }

  @Query(() => [WorkoutSession], { name: 'sessionsByRun' })
  @UseGuards(GqlAuthGuard)
  async getSessionByRun(
    @Args('runId', { type: () => String }) runId: string,
    // @CurrentUser() currentUser: User,
  ) {
    return this.workoutSessionsService.findByRunId(runId);
  }

  @ResolveField(() => Run, { nullable: true })
  async run(@Root() workoutSession: WorkoutSession) {
    if (!workoutSession.runId) return null;
    return this.relationshipsService.getRunForWorkoutSession(workoutSession.id);
  }

  @Query(() => [WorkoutSession], { name: 'sessionsByRun' })
  @UseGuards(GqlAuthGuard)
  findSessionsByRun(@Args('runId', { type: () => String }) runId: string) {
    return this.workoutSessionsService.findByRunId(runId);
  }

  @Mutation(() => WorkoutSession)
  @UseGuards(GqlAuthGuard)
  assignToRun(
    @CurrentUser() currentUser: User,
    @Args('workoutSessionId', { type: () => String }) workoutSessionId: string,
    @Args('runId', { type: () => String }) runId: string,
  ) {
    return this.workoutSessionsService.assignToRun(
      workoutSessionId,
      runId,
      currentUser.id,
    );
  }
}
