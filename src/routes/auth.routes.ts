import {Elysia, t} from "elysia";
import {bodySignIN, bodySignUP} from "../utils/endpoints.dto.ts";
import {signIN, signUP} from "../controller/auth.controller.ts";
import {storeRefreshToken} from "../services/auth.service.ts";


export const authRoutes = new Elysia({prefix: '/auth'})
  //@ts-ignore
  .post('/signin', async ({body, set, accessToken, refreshToken}) => {
    const user = await signIN(body, set);
    if (user?.email) {
      const token = await accessToken.sign({email: user.email});
      const rToken = await refreshToken.sign({email: user.email});
      storeRefreshToken(user.id, rToken).then();
      return {email: user.email, token, refreshToken: rToken};
    }
    return 'Invalid Credentials';
  }, {detail: {tags: ['auth'], security: []}, body: bodySignIN})
  .post('/signup', async ({body, set}) => {
    return signUP(body, set);
  }, {detail: {tags: ['auth'], security: []}, body: bodySignUP})

  //@ts-ignore
  .post('/refreshToken', async ({body, set, refreshToken, accessToken}) => {
    const token = await refreshToken.verify(body.refreshToken);
    if (!token) {
      set.status = 401;
      throw new Error('Unauthorized');
    }

    const newToken = await accessToken.sign({email: token.email});
    return {token: newToken};
  }, {detail: {tags: ['auth']}, body: t.Object({refreshToken: t.String()})});
