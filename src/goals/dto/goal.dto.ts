import { IsNotEmpty } from 'class-validator';

export class GoalDTO {
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  priority: any;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  projectId: string;
}
