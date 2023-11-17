import {Elysia} from "elysia";
import {handleWebhookResponse} from "../controller/stripe.service.ts";
import {Buffer} from "buffer";
import _ from "lodash";

export const stripeRoutes = new Elysia({prefix: '/stripe'})
.post('/webhook', async ({body, request}) => {
  return await handleWebhookResponse(body);
}, {detail: {tags: ['stripe']}});