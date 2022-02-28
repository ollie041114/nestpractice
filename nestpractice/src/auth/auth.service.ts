import { Injectable } from "@nestjs/common";
// It can use the dependency injection that nestJS uses under the hood

@Injectable({})
export class AuthService {
    signin() {
        return ({msg: "I have signed up"});
    }

    signup(){
        return ({msg: "I have signin up"});
    }
}