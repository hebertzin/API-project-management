import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DecisionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
