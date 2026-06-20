import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { WorkoutSession } from './workout-session.entity';

@ObjectType()
export class TrackPoint {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float, { nullable: true })
  elevation?: number;

  @Field(() => Int, { nullable: true })
  heartRate?: number;

  @Field()
  timestamp: Date;

  @Field()
  workoutSessionId: string;

  @Field(() => WorkoutSession)
  workoutSession?: WorkoutSession;
}
