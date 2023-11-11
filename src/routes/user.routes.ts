import {Elysia} from "elysia";
import {bodyBatchDTO, BodySignIN, bodySignIN} from "../utils/endpoints.dto.ts";
import {jwt} from "@elysiajs/jwt";

export const userRoutes = new Elysia({prefix: '/user'})
  .post('/signin', async ({body}) => {
  console.log(body);
}, {  detail: {tags: ['users'], security: []}, body: bodySignIN})