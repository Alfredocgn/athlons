import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Run } from './run.entity';

@ObjectType()
export class RunnerOnRun {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  runId: string;

  @Field(() => User)
  user: User;

  @Field(() => Run)
  run: Run;
}
