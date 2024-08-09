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
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('playlist')
@ApiTags('Playlist')
@ApiBearerAuth()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiOperation({ summary: 'create playlist' })
  async create(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<Partial<Playlist>> {
    return this.playlistService.create(createPlaylistDto);
  }

  @Post(':id/tracks')
  @ApiOperation({ summary: 'add track to playlist' })
  async addTrackToPlaylist(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() addTrackDto: AddTrackDto,
  ): Promise<void> {
    const msg = await this.playlistService.addTrackToPlaylist(id, addTrackDto);
    res.json({ msg });
  }

  @Get()
  @ApiOperation({ summary: 'get all playlists' })
  async findAll(): Promise<Partial<Playlist>[]> {
    return this.playlistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get playlist' })
  async findOne(@Param('id') id: number): Promise<Partial<Playlist>> {
    return this.playlistService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'update playlist' })
  async update(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Partial<Playlist>> {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete playlist' })
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.playlistService.remove(id);
    res.json({ msg });
  }
}
