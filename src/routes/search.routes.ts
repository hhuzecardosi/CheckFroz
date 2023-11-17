import {Elysia} from "elysia";
import {querySearchDTO} from "../utils/endpoints.dto.ts";
import {search} from "../controller/search.controller.ts";
import {apiKeyCheck} from "../utils/apiKeyCheck.ts";

export const searchRoutes = new Elysia({prefix: '/search'})
  .group('', (app) =>
    app
      .use(apiKeyCheck)
      .get('', async ({query}) => {
        return search(query);
      }, {detail: {tags: ['search']}, query: querySearchDTO, user: {}})
  );