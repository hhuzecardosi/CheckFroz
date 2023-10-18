import {Elysia} from "elysia";
import {AuthSuccessResponseDto, RegisterDto} from "./dto/auth.dto.ts";

export const usersRoutes = new Elysia({prefix: '/users'})
  .get('/', () => {
    console.log('users routes');
    return new Response('Welcome to users routes')
  }, {detail: {tags: ['Users']}})

  .post('/register', ({body}) => {
    console.log(body);
    return new Response(JSON.stringify(body), {headers: {'Content-Type': 'application/json'}});
  }, {
    body: RegisterDto,
    detail: {tags: ['Users']},
    response: {200: AuthSuccessResponseDto}})