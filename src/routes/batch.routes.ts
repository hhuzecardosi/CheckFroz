import {Elysia} from "elysia";
import {bodyBatchDTO} from "../utils/endpoints.dto.ts";
import {batch} from "../controller/batch.controller.ts";


export const batchRoutes = new Elysia({prefix: '/batch'})
.post('', async ({body, set}) => {
  return batch(body);
}, {  detail: {tags: ['batch']}, body: bodyBatchDTO})