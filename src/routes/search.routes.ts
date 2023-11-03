import {Elysia} from "elysia";
import {querySearchDTO} from "../utils/endpoints.dto.ts";

export const searchRoutes = new Elysia({prefix: '/search'})
  .get('', async ({query}) => {
    console.log(query);
  }, {  detail: {tags: ['search']}, query: querySearchDTO});