import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OAuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  profileImg?: string;

  constructor(partial: Partial<OAuthUserDto>) {
    Object.assign(this, partial);
  }
}
