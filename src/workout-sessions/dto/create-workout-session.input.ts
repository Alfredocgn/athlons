import { InputType, Field, Int, Float } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DeviceType, WorkoutType } from 'src/common/enums';
import { CreateTrackPointInput } from './create-track-point.input';
import { Type } from 'class-transformer';

@InputType()
export class CreateWorkoutSessionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  duration: number;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  caloriesBurned?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  avgPace?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  routeData?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => WorkoutType)
  @IsEnum(WorkoutType)
  @IsNotEmpty()
  workoutType: WorkoutType;

  @Field(() => DeviceType)
  @IsEnum(DeviceType)
  @IsNotEmpty()
  importedFrom: DeviceType;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  externalId?: string;
  @Field(() => [CreateTrackPointInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTrackPointInput)
  trackPoints?: CreateTrackPointInput[];
}
