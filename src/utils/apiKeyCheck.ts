import {Elysia} from "elysia";
import {checkApiKey} from "../services/subscription.service.ts";

export const apiKeyCheck = new Elysia()
  .derive(async ({headers, set}) => {
    const apiKey = headers['x-api-key'];
    if (!apiKey){
      set.status = 401;
      throw new Error("Unauthorized");
    }

    const status = await checkApiKey(apiKey)
    if (!status){
      set.status = 401;
      throw new Error("Unauthorized");
    }

    return apiKey;
  });