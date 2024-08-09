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
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('track')
@ApiTags('Track')
@ApiBearerAuth()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'create track' })
  async create(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Partial<Track>> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all tracks' })
  async findAll(): Promise<Partial<Track>[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get track' })
  async findOne(@Param('id') id: number): Promise<Partial<Track>> {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'update track' })
  async update(
    @Param('id') id: number,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Partial<Track>> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'delete track' })
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.trackService.remove(id);
    res.json({ msg });
  }
}
