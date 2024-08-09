import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'jane' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'singing is my hobby' })
  @IsString()
  @IsOptional()
  bio: string;
}
