import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsOptional()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;

  @IsNumber()
  @IsOptional()
  albumId: number;
}
