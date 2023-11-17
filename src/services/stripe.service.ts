import Stripe from "stripe";
import {activateSubscription} from "./subscription.service.ts";

export async function handleWebhookResponse(body: any) {
  let event: Stripe.Event = body;


  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      if (!body.metadata?.subscription_id) {
        console.error(`❌ No subscription id in metadata`);
        break;
      }
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      console.log(paymentIntent);
      activateSubscription(paymentIntent.metadata.subscription_id).then();
      break;
    default:
      console.error(`Unhandled event type ${event.type}`);
  }

}