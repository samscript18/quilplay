import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-user.dto';
import { Public } from 'src/auth/guard/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Partial<User>[]> {
    return this.userService.findAll();
  }

  @Get('profile')
  getUserProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<User>> {
    return this.userService.findOne(id);
  }

  @Public()
  @Get()
  async findUserByEmail(@Body() loginDto: LoginDto): Promise<User> {
    return this.userService.findUserByEmail(loginDto.email);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.userService.remove(id);
    res.json({ msg });
  }
}
