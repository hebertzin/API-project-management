import { Priority } from '../types/index';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  priority: Priority;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
