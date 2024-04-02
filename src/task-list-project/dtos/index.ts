import { Priority } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class TaskListDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;
}
