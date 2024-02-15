import { IsNotEmpty } from 'class-validator';

export class CreateProfileDTO {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  company: string;
  @IsNotEmpty()
  position: string;
  @IsNotEmpty()
  social: string[];
  @IsNotEmpty()
  userId: string;
}
