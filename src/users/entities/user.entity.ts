import { ObjectType, Field, ID } from '@nestjs/graphql';
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

  @Field({ nullable: true })
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
