import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRouteInput } from './create-route.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRouteInput extends PartialType(CreateRouteInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;
}
