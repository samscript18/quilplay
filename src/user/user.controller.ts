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
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'create user' })
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'get all users' })
  async findAll(): Promise<Partial<User>[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get('profile')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'get user profile' })
  getUserProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'get user by id' })
  async findOne(@Param('id') id: number): Promise<Partial<User>> {
    return this.userService.findOne(id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'get user by email' })
  async findUserByEmail(@Body() loginDto: LoginDto): Promise<User> {
    return this.userService.findUserByEmail(loginDto.email);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'update user' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'delete user' })
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.userService.remove(id);
    res.json({ msg });
  }
}
