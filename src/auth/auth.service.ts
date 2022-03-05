import { ForbiddenException, Injectable } from "@nestjs/common";
// It can use the dependency injection that nestJS uses under the hood
import { PrismaService } from "../prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
        ){
    }
    async signToken(
        // information we will extract from jwt, to see if the user has an access
        // to perform a certain action
        userId: number, 
        email: string): Promise<{access_token: string}> { //return type of string{

            const payload = {
                sub: userId,
                email
            }; 
            const secret = this.config.get('JWT_SECRET')
            const token = await this.jwt.signAsync(payload, {
                expiresIn: '15m',
                // A user will have an authroziation token for 15 minutes.
                // After that, the token will be rejected and he'll have to sign in
                // ... again
                secret: secret
            })
            return {
                access_token: token
            }
    }

    async signup(dto: AuthDto){
        // generate the password hash
        const hash = await argon.hash(dto.password);

        // save the new user in the db
        
        try{ // use try to catch an error which occurs
            const user = await this.prisma.user.create({
                data: {
                email: dto.email,
                hash,
            },
            })
            return user;
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code == "P2002")
                // P2002 error code stands for "You tried to create a duplicate field
                // supposed to be unique"
                {
                    throw new ForbiddenException("Credentials taken")
                    //throw a specific error
                    
                };
                throw error;
                // otherwise, just throw an error

            }
        }
        
        // return the saved user 
        
    }
    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
             where: {
                 email: dto.email,
             }
              // findFirst -> first user that matches the field (any field)
              // findUnique -> you should use unique field
         })
         // compare passwords
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        // If password incorrect throw exception 
        if (!pwMatches){
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        }
        return this.signToken(user.id, user.email);
    }
}