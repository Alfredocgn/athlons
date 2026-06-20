import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class RegisterForRunInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}
