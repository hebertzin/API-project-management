import { IsNotEmpty } from 'class-validator';

export class QuestionsDTO {
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  userId: string;
}
