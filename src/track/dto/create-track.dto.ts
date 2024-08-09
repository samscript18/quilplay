import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'The Convergence' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 800 })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({ example: 'someurl.com' })
  @IsString()
  @IsOptional()
  url: string;

  @ApiProperty({ example: 95 })
  @IsNumber()
  @IsNotEmpty()
  artistId: number;

  @ApiProperty({ example: 22 })
  @IsNumber()
  @IsOptional()
  albumId: number;
}
