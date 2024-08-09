import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Seeking Me' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2024-01-12T14:30:00Z' })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({ example: 'someurl.com' })
  @IsString()
  @IsOptional()
  coverImage: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @IsNotEmpty()
  artistId: number;
}
