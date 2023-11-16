import {PrismaClient, Subscription} from "@prisma/client";
import {SetType} from "../utils/set.utils.ts";
import {createPaymentIntent} from "../client/stripe.client.ts";


export async function createNewSubscription(userId: string, set: SetType) {
  const prisma = new PrismaClient();

  const user = await prisma.users.findUnique({where: {id: userId}});

  if(!user){
    set.status = "Bad Request";
    throw new Error('User does not exist');
  }

  const subscription : Subscription = await prisma.subscription.create({
    data: {user: {connect: {id: userId}}}
  });

  console.log(subscription);

  try {
    const paymentIntent = await createPaymentIntent(userId, subscription.idSubscription);

    await prisma.subscription.update({
      where: {idSubscription: subscription.idSubscription},
      data: {paymentIntent: paymentIntent.id}
    });

    await prisma.$disconnect();

    return {subscription: subscription.idSubscription, apiKey: subscription.apiKey};
  } catch (e) {
    await prisma.subscription.delete({where: {idSubscription: subscription.idSubscription}});
    await prisma.$disconnect();
    set.status = "Internal Server Error";
    throw new Error('Error while payment intent creation');
  }
}

export async function deactivateSubscription(subscriptionId: string, set: SetType) {
  const prisma = new PrismaClient();

  const subscription = await prisma.subscription.findUnique({where: {idSubscription: subscriptionId}});

  if(!subscription){
    set.status = "Bad Request";
    throw new Error('Subscription does not exist');
  }

  await prisma.subscription.update({where: {idSubscription: subscriptionId}, data: {active: false}});
  await prisma.$disconnect();

  return 'Unsubscribed successfully';
}

export async function activateSubscription(subscriptionId: string) {
  const prisma = new PrismaClient();

  const subscription = await prisma.subscription.findUnique({where: {idSubscription: subscriptionId}});

  if(!subscription){
    throw new Error('Subscription does not exist');
  }

  await prisma.subscription.update({where: {idSubscription: subscriptionId}, data: {active: true}});
  await prisma.$disconnect();

  return 'Subscribed successfully';
}