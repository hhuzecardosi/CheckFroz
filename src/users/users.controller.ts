import {Elysia} from "elysia";

export const usersRoutes = new Elysia({prefix: '/users'})
  .get('/', () => {
    console.log('users routes');
    return new Response('Welcome to users routes')
  }, {detail: {tags: ['Users']}})

