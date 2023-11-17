import {Elysia} from "elysia";
import {handleWebhookResponse} from "../services/stripe.service.ts";

export const stripeRoutes = new Elysia({prefix: '/stripe'})
.post('/webhook', async ({body}) => {
  return await handleWebhookResponse(body);
}, {detail: {tags: ['stripe']}});