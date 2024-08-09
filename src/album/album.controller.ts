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
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('album')
@ApiTags('Album')
@ApiBearerAuth()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'create album' })
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Partial<Album>> {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all albums' })
  async findAll(): Promise<Partial<Album>[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get album' })
  async findOne(@Param('id') id: number): Promise<Partial<Album>> {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'update album' })
  async update(
    @Param('id') id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Partial<Album>> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @Roles(Role.ARTIST)
  @ApiOperation({ summary: 'delete album' })
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const msg = await this.albumService.remove(id);
    res.json({ msg });
  }
}
