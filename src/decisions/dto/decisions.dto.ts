import { IsNotEmpty } from 'class-validator';

export class DecisionDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  projectId: string;
  @IsNotEmpty()
  userId: string;
}
