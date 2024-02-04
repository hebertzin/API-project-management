import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
