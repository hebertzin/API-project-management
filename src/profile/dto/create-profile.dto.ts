import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProfileDTO {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  social: string[];

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  userId: string;
}
