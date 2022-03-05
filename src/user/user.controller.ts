import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {Request} from 'express';
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../guard";
import { User } from ".prisma/client";
import {EditUserDto} from './dto';
import { UserService } from "./user.service";
    // UseGuards will force all users accessing this route to verify their identity
    // using jwt tokens
    @UseGuards(JwtGuard)
    // Putting it above will make it work on a global level
@Controller('users')

export class UserController {
    constructor(private userService: UserService){}
    @Get('me') // if you leave it blank, it will catch all requests incoming form 
    // GET /users
   // We use a custom decorator defined in decorator
    getMe(
        @GetUser() user: User,
        @GetUser('email') email: string,) {
    // User as defined in our prisma schema
        return user;
    }

    @Patch('edit')
    editUser(
        @GetUser('id') userId: number, 
        @Body() dto: EditUserDto) { 
            return this.userService.editUser(userId, dto);

    }
}