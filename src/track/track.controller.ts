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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '@prisma/client';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Partial<Track>> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll(): Promise<Partial<Track>[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<Track>> {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Partial<Track>> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.trackService.remove(id);
    res.json({ msg });
  }
}
