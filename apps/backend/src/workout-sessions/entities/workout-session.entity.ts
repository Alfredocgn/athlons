import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { DeviceType, WorkoutType } from 'src/common/enums';

import { User } from 'src/users/entities/user.entity';
import { TrackPoint } from './track-point.entity';
import { Run } from 'src/runs/entities/run.entity';

@ObjectType()
export class WorkoutSession {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  date: Date;

  @Field(() => Int)
  duration: number;

  @Field(() => Float)
  distance: number;

  @Field(() => Int, { nullable: true })
  caloriesBurned?: number;

  @Field(() => Float, { nullable: true })
  avgPace?: number;

  @Field({ nullable: true })
  routeData?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => WorkoutType)
  workoutType: WorkoutType;

  @Field(() => DeviceType, { nullable: true })
  importedFrom?: DeviceType;

  @Field({ nullable: true })
  externalId?: string;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;

  @Field(() => [TrackPoint], { nullable: true })
  trackPoints?: TrackPoint[];

  @Field(() => String, { nullable: true })
  runId?: string;

  @Field(() => Run, { nullable: true })
  run?: Run;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
