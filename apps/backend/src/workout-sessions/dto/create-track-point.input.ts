import { InputType, Field, Int, Float } from '@nestjs/graphql';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateTrackPointInput {
  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  elevation?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  heartRate?: number;

  @Field()
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;
}
