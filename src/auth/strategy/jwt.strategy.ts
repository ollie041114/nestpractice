import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
){
    constructor(private config: ConfigService,
        private prisma: PrismaService
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }
    // whatever is returned from validate, will get attached to the user request object
    async validate(payload: any) {
        //create a user by his id stored in paylod (see auth.service for how payload
        // is imiplemented)
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            }
        })
    // delete user password not to expose sensitive information
    delete user.hash;
    return user; 
    }
}