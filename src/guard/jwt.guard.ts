import { AuthGuard } from "@nestjs/passport";

// This is where our custom AuthGuard will be created 
export class JwtGuard extends AuthGuard('jwt'){
    constructor(){
        super();
    }
}