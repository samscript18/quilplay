import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async signUp(createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.userService.findUserByEmail(loginDto.email);
    const isMatch = await this.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }
    return await this.jwtService.signAsync({ userId: user.id });
  }
}
