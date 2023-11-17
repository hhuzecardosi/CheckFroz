import {Elysia} from "elysia";
import {bodyBatchDTO} from "../utils/endpoints.dto.ts";
import {batch} from "../services/batch.service.ts";
import {apiKeyCheck} from "../utils/apiKeyCheck.ts";


export const batchRoutes = new Elysia({prefix: '/batch'}).group('', (app) =>
  app
    .use(apiKeyCheck)
    .post('', async ({body}) => {
      return batch(body);
    }, {detail: {tags: ['batch']}, body: bodyBatchDTO, user: {}})
);