import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class WorkoutSessionStats {
  @Field(() => Float)
  totalDistance: number;

  @Field(() => Int)
  totalDuration: number;

  @Field(() => Int)
  workoutCount: number;

  @Field(() => Float)
  avgPace: number;

  @Field(() => Float, { nullable: true })
  weeklyGoalProgress?: number;
}
