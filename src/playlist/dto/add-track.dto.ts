import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddTrackDto {
  @IsNumber()
  @IsNotEmpty()
  trackId: number;
}
