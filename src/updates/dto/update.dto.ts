import { IsNotEmpty } from 'class-validator';

export class UpdateDTO {
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  projectId: string;
  @IsNotEmpty()
  projectsId: string;
  @IsNotEmpty()
  userId: string;
}
