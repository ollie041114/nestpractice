import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

// Controller will need to call the service
// i.e. POST request to log in a user from the internet
// -> Will call a service class
// -> Return the result to the user

// Here we return everrything related to the request. The logic of how it's implemented is in 
// service.ts
@Controller('auth') // Auth to make it a route
export class AuthController {
    constructor(private authService: AuthService){}
        // private authService just creates this.authService 
    
        @Post('signup') // To make it a route we use Post annotator
        // POST auth/signup to make a request
        signup(@Body() dto: AuthDto){
            return this.authService.signup(dto);
            // Handling only logic of the request
        }
        @Post('signin') // To make it a route we use Post annotator
        signin(@Body() dto: AuthDto){
            return this.authService.signin(dto);
        }
}