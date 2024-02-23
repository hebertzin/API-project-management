import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class QuestionsDTO {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
