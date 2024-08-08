import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto): Promise<Partial<Track>> {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async findAll(): Promise<Partial<Track>[]> {
    return this.prisma.track.findMany({
      orderBy: { title: 'asc' },
      include: { artist: true, album: true },
    });
  }

  async findOne(id: number): Promise<Partial<Track>> {
    try {
      const track = await this.prisma.track.findUniqueOrThrow({
        where: { id },
        include: { artist: true, album: true },
      });
      return track;
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} is not found`, error);
    }
  }

  async update(
    id: number,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Partial<Track>> {
    try {
      const track = await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
        include: { artist: true, album: true },
      });
      return track;
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} is not found`, error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.track.delete({
        where: { id },
      });
      return `Track with id ${id} has been deleted`;
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} is not found`, error);
    }
  }
}
