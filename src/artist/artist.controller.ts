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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '@prisma/client';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Partial<Artist>> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<Partial<Artist>[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<Artist>> {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Partial<Artist>> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.artistService.remove(id);
    res.json({ msg });
  }
}
