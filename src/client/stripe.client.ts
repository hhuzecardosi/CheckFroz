import Stripe from "stripe";


export const stripe = require('stripe')(Bun.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(userId: string, subscriptionId: string): Promise<Stripe.PaymentIntent> {
  console.log('Creating payment intent');
  const paymentParams: Stripe.PaymentIntentCreateParams = {
    amount: 1000,
    currency: 'eur',
    payment_method_types: ['card'],
    metadata: {user_id: userId, subscription_id: subscriptionId}
  }
  try {
    return await stripe.paymentIntents.create(paymentParams);
  } catch (e) {
    console.log('Error payment stripe: ', e);
    throw new Error('Error payment intent creation stripe');
  }
}