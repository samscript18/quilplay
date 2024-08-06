import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [SongModule],
  exports: [PrismaService],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
