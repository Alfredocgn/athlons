import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Gender, Pace } from 'src/common/enums';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => Float, { nullable: true })
  height?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field(() => Float, { nullable: true })
  preferredDistance?: number;

  @Field(() => Float, { nullable: true })
  weeklyGoal?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  socialLinks?: any;

  @Field()
  enableEmailNotifications: boolean;

  @Field()
  enablePushNotifications: boolean;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => Pace, { nullable: true })
  pace: Pace;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  profileImg: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
