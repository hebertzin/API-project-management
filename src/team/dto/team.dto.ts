import { IsNotEmpty } from 'class-validator';

export class TeamDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  deparatament: string;
  @IsNotEmpty()
  userId: string;
}
