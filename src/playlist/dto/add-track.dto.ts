import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddTrackDto {
  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsNotEmpty()
  trackId: number;
}
