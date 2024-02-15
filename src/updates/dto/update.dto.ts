import { IsNotEmpty } from 'class-validator';

export class UpdateDTO {
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  projectId: string;
  @IsNotEmpty()
  userId: string;
}
