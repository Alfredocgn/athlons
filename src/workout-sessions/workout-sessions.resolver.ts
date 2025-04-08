import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkoutSessionsService } from './workout-sessions.service';
import { WorkoutSession } from './entities/workout-session.entity';
import { CreateWorkoutSessionInput } from './dto/create-workout-session.input';
import { UpdateWorkoutSessionInput } from './dto/update-workout-session.input';

@Resolver(() => WorkoutSession)
export class WorkoutSessionsResolver {
  constructor(private readonly workoutSessionsService: WorkoutSessionsService) {}

  @Mutation(() => WorkoutSession)
  createWorkoutSession(@Args('createWorkoutSessionInput') createWorkoutSessionInput: CreateWorkoutSessionInput) {
    return this.workoutSessionsService.create(createWorkoutSessionInput);
  }

  @Query(() => [WorkoutSession], { name: 'workoutSessions' })
  findAll() {
    return this.workoutSessionsService.findAll();
  }

  @Query(() => WorkoutSession, { name: 'workoutSession' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workoutSessionsService.findOne(id);
  }

  @Mutation(() => WorkoutSession)
  updateWorkoutSession(@Args('updateWorkoutSessionInput') updateWorkoutSessionInput: UpdateWorkoutSessionInput) {
    return this.workoutSessionsService.update(updateWorkoutSessionInput.id, updateWorkoutSessionInput);
  }

  @Mutation(() => WorkoutSession)
  removeWorkoutSession(@Args('id', { type: () => Int }) id: number) {
    return this.workoutSessionsService.remove(id);
  }
}
