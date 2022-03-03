import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post } from "@nestjs/common";
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

        // When we sign in, we don't create any new resource. So, change the
        // HTTP status to "200 OK" (It's "201 Created" by default)
        @HttpCode(HttpStatus.OK)
        @Post('signin') // To make it a route we use Post annotator
        signin(@Body() dto: AuthDto){
            return this.authService.signin(dto);
        }
}