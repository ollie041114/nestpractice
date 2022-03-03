import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

// Controllers are responsible for handling incoming requests and returning responses to the client

@Module({
    controllers: [UserController],
    providers: []
})
export class UserModule {

}
