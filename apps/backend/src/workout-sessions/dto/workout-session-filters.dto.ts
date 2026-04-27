import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { WorkoutType } from '../../common/enums/workout-type.enum';

@InputType()
export class WorkoutSessionFilters {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field(() => WorkoutType, { nullable: true })
  @IsOptional()
  @IsEnum(WorkoutType)
  workoutType?: WorkoutType;
}
