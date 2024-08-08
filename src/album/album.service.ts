import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto): Promise<Partial<Album>> {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll(): Promise<Partial<Album>[]> {
    return this.prisma.album.findMany({
      orderBy: { title: 'asc' },
      include: { artist: true, tracks: true },
    });
  }

  async findOne(id: number): Promise<Partial<Album>> {
    try {
      const album = await this.prisma.album.findUniqueOrThrow({
        where: { id },
        include: { artist: true, tracks: true },
      });
      return album;
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} is not found`, error);
    }
  }

  async update(
    id: number,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Partial<Album>> {
    try {
      const album = await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
        include: { artist: true, tracks: true },
      });
      return album;
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} is not found`, error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.album.delete({
        where: { id },
      });
      return `Album with id ${id} has been deleted`;
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} is not found`, error);
    }
  }
}
