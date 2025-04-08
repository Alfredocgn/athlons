import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
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

@Resolver(() => WorkoutSession)
export class WorkoutSessionsResolver {
  constructor(
    private readonly workoutSessionsService: WorkoutSessionsService,
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
}
