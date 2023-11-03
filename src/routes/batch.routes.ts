import {Elysia} from "elysia";
import {bodyBatchDTO} from "../utils/endpoints.dto.ts";


export const batchRoutes = new Elysia({prefix: '/batch'})
.head('', async ({body}) => {
  console.log('HEAD', body);
}, {  detail: {tags: ['batch']}, body: bodyBatchDTO})