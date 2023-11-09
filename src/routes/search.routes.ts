import {Elysia} from "elysia";
import {querySearchDTO} from "../utils/endpoints.dto.ts";
import {search} from "../controller/search.controller.ts";

export const searchRoutes = new Elysia({prefix: '/search'})
  .get('', async ({query}) => {
    return search(query);
  }, {  detail: {tags: ['search']}, query: querySearchDTO});