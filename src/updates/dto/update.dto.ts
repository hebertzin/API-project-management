import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateDTO {
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
  projectsId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
