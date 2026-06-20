import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { RunnerOnRun } from './runner-on-run.entity';
import { Pace } from '../../common/enums/index';
import { Route } from 'src/routes/entities/route.entity';
import { WorkoutSession } from 'src/workout-sessions/entities/workout-session.entity';

@ObjectType()
export class Run {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  location: string;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  distance?: number;

  @Field(() => String, { nullable: true })
  eventImage?: string;

  @Field(() => Pace, { nullable: true })
  pace?: Pace;

  @Field(() => String)
  creatorId: string;

  @Field(() => User)
  creator: User;

  @Field(() => [RunnerOnRun], { nullable: true })
  participants?: RunnerOnRun[];

  @Field(() => String, { nullable: true })
  routeId?: string;

  @Field(() => Route, { nullable: true })
  route?: Route;

  @Field(() => [WorkoutSession], { nullable: true })
  workoutSessions?: WorkoutSession[];

  @Field(() => String, { nullable: true })
  routeData?: string;

  @Field(() => String, { nullable: true })
  clubdId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
