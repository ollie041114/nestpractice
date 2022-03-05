import { Controller, UseGuards, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService){

    }


    @Get()
    getBookmarks(@GetUser('id') userId: number){
        return this.bookmarkService.getBookmarks(userId);
    }
    
    @Get(':id') // : means it's a parameter
    getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        ){
        return this.bookmarkService.getBookmarkById(userId, bookmarkId);
    }
    @Post()
    createBookmark(@GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto){
        return this.bookmarkService.createBookmark(userId, dto);
    }
    

    @Patch()
    editBookmarkById(@GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto) {
        return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
    }

    @Delete()
    deleteBookmarkById(@GetUser('id') userId: number, 
    @Param('id', ParseIntPipe) bookmarkId: number,) {
        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
    }
}