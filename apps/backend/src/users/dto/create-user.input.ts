// src/users/dto/create-user.input.ts
import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Gender, Pace } from '../../common/enums';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

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

  @Field({ nullable: true })
  @IsOptional()
  profileImg?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  height?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
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

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  enableEmailNotifications?: boolean;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  enablePushNotifications?: boolean;
}
