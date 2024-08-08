import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Partial<User>[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<User>> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Partial<User>> {
    return this.userService.remove(id);
  }
}
