import { IsNotEmpty } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  comment: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  projectId: string;
  @IsNotEmpty()
  questionId: string;
}
