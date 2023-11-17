import {Elysia, t} from "elysia";
import _ from "lodash";
import {isAuthenticated} from "../utils/isAuthenticated.ts";

import {createNewSubscription, deactivateSubscription, getSubscriptions} from "../controller/subscription.service.ts";


export const subscriptionRoutes = new Elysia({prefix: '/user'})
  .group('', (app) =>
    app.use(isAuthenticated)
      //@ts-ignore
      .get('/subscribe', async ({headers, set, accessToken}) => {
        const token = _.get(headers, 'authorization');
        const decryptedToken = await accessToken.verify(token);
        const userId = decryptedToken?.userId;
        return await createNewSubscription(userId, set);
      }, {detail: {tags: ['user'], security: []}})
      .get('/unsubscribe/:subscriptionId', async ({params, set}) => {
        return deactivateSubscription(params.subscriptionId, set)
        // @ts-ignore
      }, {detail: {tags: ['user'], security: [], params: t.Object({subscriptionId: t.String()})}})
      // @ts-ignore
      .get('/subscriptions', async ({headers, set, accessToken}) => {
        const token = _.get(headers, 'authorization');
        const decryptedToken = await accessToken.verify(token);
        const userId = decryptedToken?.userId;
        return await getSubscriptions(userId, set);
      })
  );