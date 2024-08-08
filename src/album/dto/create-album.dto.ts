import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;
}
