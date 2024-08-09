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
import { Public } from 'src/auth/guard/auth.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('artist')
@ApiTags('Artist')
@ApiBearerAuth()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'create artist' })
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Partial<Artist>> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all artists' })
  async findAll(): Promise<Partial<Artist>[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get artist' })
  async findOne(@Param('id') id: number): Promise<Partial<Artist>> {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'update artist' })
  async update(
    @Param('id') id: number,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Partial<Artist>> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'delete artist' })
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.artistService.remove(id);
    res.json({ msg });
  }
}
