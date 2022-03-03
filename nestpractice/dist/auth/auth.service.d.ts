import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
    signup(dto: AuthDto): Promise<import(".prisma/client").User>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
}
