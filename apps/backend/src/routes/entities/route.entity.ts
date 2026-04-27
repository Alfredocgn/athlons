import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Run } from 'src/runs/entities/run.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Route {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  routeData: string;

  @Field(() => Float)
  distance: number;

  @Field(() => Float, { nullable: true })
  elevation: number;

  @Field()
  creatorId: string;

  @Field(() => User)
  creator: User;

  @Field(() => [Run], { nullable: true })
  runs?: Run[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
