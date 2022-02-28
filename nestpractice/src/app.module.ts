import { Module } from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
// Decorator: function which adds metdata to the function

// Module: things you organize your app into
// i.e. Bookmarks module, Authentification module, Database module
@Module({
  imports: [AuthModule, UserModule, BookmarkModule]
})
export class AppModule {}