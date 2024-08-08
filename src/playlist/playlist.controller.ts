import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Response } from 'express';
import { Playlist } from '@prisma/client';
import { AddTrackDto } from './dto/add-track.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async create(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<Partial<Playlist>> {
    return this.playlistService.create(createPlaylistDto);
  }

  @Post(':id/tracks')
  async addTrackToPlaylist(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() addTrackDto: AddTrackDto,
  ): Promise<void> {
    const msg = await this.playlistService.addTrackToPlaylist(id, addTrackDto);
    res.json({ msg });
  }

  @Get()
  async findAll(): Promise<Partial<Playlist>[]> {
    return this.playlistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<Playlist>> {
    return this.playlistService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Partial<Playlist>> {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.playlistService.remove(id);
    res.json({ msg });
  }
}
