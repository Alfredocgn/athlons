import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Min, Max } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UpdateProfileInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

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
}
