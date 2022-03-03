import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {PrismaClient} from '@prisma/client';

@Injectable({})
export class PrismaService extends PrismaClient{
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                    // from the env variable
                }
            }
        })
    }

    cleanDb(){
        // Why do we need this logic? In between tests, we need to empty out the 
        // database without restarting the docker (slow). 
        // Will delete bookmark and user (in this order, bc bookmark depends on user)
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany()
        ])
    }
}
