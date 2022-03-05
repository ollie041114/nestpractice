import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Controllers are responsible for handling incoming requests and returning responses to the client

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {

}
