import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Pace } from 'src/common/enums';

@InputType()
export class CreateRunInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  location: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  latitude?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  distance?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  eventImage?: string;

  @Field(() => Pace, { nullable: true })
  @IsOptional()
  pace?: Pace;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  routeData?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  clubId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  routeId?: string;
}
