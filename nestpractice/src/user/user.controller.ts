import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {Request} from 'express';


@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me') // if you leave it blank, it will catch all requests incoming form 
    // GET /users
    getMe(@Req() req: Request) {
        console.log({
            req,
        })
        return 'user info';
    }
}