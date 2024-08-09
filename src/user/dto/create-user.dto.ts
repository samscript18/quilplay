import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'jane' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'janedoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'jane123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsEnum(['USER', 'ARTIST', 'ADMIN'], { each: true })
  @IsOptional()
  role: Role;
}
