// Decorators allow us to create something ergonomic from a visual point of view.

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// the reason it works safely is that
// we chain "user" object to request based on the "userId" field we chain
// to authentification token. So, you can only access ONLY your data with your
// authentification token. Also, if the token expires, you can't get access
// to your data, as there's no chaining (can't extract id anymore).
export const GetUser = createParamDecorator(
    // type: string or undefined
    (data: string | undefined, ctx: ExecutionContext) => {
    // our user is attached to the request object.
    // In NodeJs world, it's common practice to attach properties to the request object.
     
        const request = ctx
            .switchToHttp()
            .getRequest();

        if (data){
            return request.user[data];
            //if data is passed, then we will return "data" field from the user object
        }

        // if it doesn't exist, we will get the whole user
        return request.user;
    }
)