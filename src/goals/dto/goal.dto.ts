import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GoalDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  priority: any;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
