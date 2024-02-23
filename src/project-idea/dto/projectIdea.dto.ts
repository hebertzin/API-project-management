import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectIdeaDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  commentId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  userId: string;
}
