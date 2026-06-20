import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsOptional,
  IsDateString,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';
import { Pace } from 'src/common/enums';

@InputType()
export class RunFilters {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  fromDate?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  toDate?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minDistance?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDistance?: number;

  @Field(() => Pace, { nullable: true })
  @IsOptional()
  pace?: Pace;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  creatorId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  clubId?: string;
}
