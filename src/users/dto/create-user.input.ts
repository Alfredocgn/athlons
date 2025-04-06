// src/users/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Gender, Pace } from '../../common/enums';

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
}
