import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto): Promise<Partial<Artist>> {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async findAll(): Promise<Partial<Artist>[]> {
    return this.prisma.artist.findMany({
      orderBy: { name: 'asc' },
      include: { albums: true, tracks: true },
    });
  }

  async findOne(id: number): Promise<Partial<Artist>> {
    try {
      const artist = await this.prisma.artist.findUniqueOrThrow({
        where: { id },
        include: { albums: true, tracks: true },
      });
      return artist;
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} is not found`, error);
    }
  }

  async update(
    id: number,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Partial<Artist>> {
    try {
      const artist = await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
        include: { albums: true, tracks: true },
      });
      return artist;
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} is not found`, error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.artist.delete({
        where: { id },
      });
      return `Artist with id ${id} has been deleted`;
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} is not found`, error);
    }
  }
}
