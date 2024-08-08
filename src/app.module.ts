import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    UserModule,
    PlaylistModule,
    PrismaModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
