import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { Response } from 'express';
import { Public } from './guard/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async hashPassword(password: string): Promise<string> {
    const saltFactor = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, saltFactor);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);
    res.json({ accessToken });
  }
}
