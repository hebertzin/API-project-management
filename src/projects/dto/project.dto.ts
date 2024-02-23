import { Priority } from '../types/index';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsNotEmpty()
  visibility: boolean;

  @IsNotEmpty()
  priority: Priority;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
