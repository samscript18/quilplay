import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number): Promise<Partial<User>> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} is not found`, error);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: updateUserDto,
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} is not found`, error);
    }
  }

  async remove(id: number): Promise<Partial<User>> {
    try {
      const user = await this.prisma.user.delete({
        where: { id: id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} is not found`, error);
    }
  }
}
