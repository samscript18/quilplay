import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Playlist } from '@prisma/client';
import { AddTrackDto } from './dto/add-track.dto';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}
  async create(
    createPlaylistDto: CreatePlaylistDto,
  ): Promise<Partial<Playlist>> {
    return this.prisma.playlist.create({
      data: createPlaylistDto,
    });
  }

  async addTrackToPlaylist(
    id: number,
    addTrackDto: AddTrackDto,
  ): Promise<string> {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: { tracks: true },
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with id ${id} is not found`);
    }

    const trackExists = await this.prisma.playlist.findUnique({
      where: { id, tracks: { some: { id: addTrackDto.trackId } } },
      include: { tracks: true },
    });

    if (trackExists) {
      throw new BadRequestException(
        `Track with id ${addTrackDto.trackId} already exists in this playlist`,
      );
    }

    await this.prisma.playlist.update({
      where: { id },
      data: { tracks: { connect: { id: addTrackDto.trackId } } },
    });
    return `Track with id ${addTrackDto.trackId} has been successfully added to the Playlist`;
  }

  async findAll(): Promise<Partial<Playlist>[]> {
    return this.prisma.playlist.findMany({
      orderBy: { name: 'asc' },
      include: { tracks: true },
    });
  }

  async findOne(id: number): Promise<Partial<Playlist>> {
    try {
      const playlist = await this.prisma.playlist.findUniqueOrThrow({
        where: { id },
        include: { tracks: true },
      });
      return playlist;
    } catch (error) {
      throw new NotFoundException(`Playlist with id ${id} is not found`, error);
    }
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Partial<Playlist>> {
    try {
      const playlist = await this.prisma.playlist.update({
        where: { id },
        data: updatePlaylistDto,
        include: { tracks: true },
      });
      return playlist;
    } catch (error) {
      throw new NotFoundException(`Playlist with id ${id} is not found`, error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.playlist.delete({
        where: { id },
      });
      return `Playlist with id ${id} has been deleted`;
    } catch (error) {
      throw new NotFoundException(`Playlist with id ${id} is not found`, error);
    }
  }
}
