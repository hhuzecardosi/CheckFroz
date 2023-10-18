import {Elysia} from "elysia";
import {usersRoutes} from "./src/users/users.controller.ts";
import swagger from "@elysiajs/swagger";

declare module "bun" {
  interface Env {
    PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }
}

const app = new Elysia()

app.use(swagger({
  path: '/v1/doc',
  documentation: {
    info: {title: 'CheckFroz Documentation', version: '1.0.0', description: ''},
    tags: [
      {name: 'Users', description: ''}
    ]
  }
}));

app.use(usersRoutes);

app.listen(Bun.env.PORT, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});