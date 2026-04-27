import { IsNotEmpty, IsString } from 'class-validator';
import { CreateWorkoutSessionInput } from './create-workout-session.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateWorkoutSessionInput extends PartialType(
  CreateWorkoutSessionInput,
) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;
}
