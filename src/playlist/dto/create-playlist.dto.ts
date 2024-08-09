import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'gospel vibes' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 46 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
