import { Module } from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
// Decorator: function which adds metdata to the function

// Module: things you organize your app into
// i.e. Bookmarks module, Authentification module, Database module
@Module({
  imports:  [ConfigModule.forRoot({
    isGlobal: true // makes it visible not only to AppModule, but to PrismaModule etc
  }), AuthModule, UserModule, BookmarkModule, PrismaModule]
})
export class AppModule {}