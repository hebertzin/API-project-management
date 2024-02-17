import { IsNotEmpty } from 'class-validator';

export class TeamDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  departament: string;
  @IsNotEmpty()
  userId: string;
}
