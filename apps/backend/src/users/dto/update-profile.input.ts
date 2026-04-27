import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Min, Max } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { Gender, Pace } from 'src/common/enums';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  birthDate?: Date;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  gender?: Gender;

  @Field(() => Pace, { nullable: true })
  @IsOptional()
  pace?: Pace;

  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0)
  @Max(300)
  height?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0)
  @Max(300)
  weight?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  preferredDistance?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  weeklyGoal?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  socialLinks?: any;

  @Field({ nullable: true })
  @IsOptional()
  enableEmailNotifications?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  enablePushNotifications?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  profileImg?: string;
}
