import {Elysia} from "elysia";

export const errorHandling = new Elysia()
  .onError(({error}) => {
    return error.message;
  })