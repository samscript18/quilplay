import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from '@prisma/client';
import { Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Partial<Album>> {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll(): Promise<Partial<Album>[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<Album>> {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Partial<Album>> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.albumService.remove(id);
    res.json({ msg });
  }
}
