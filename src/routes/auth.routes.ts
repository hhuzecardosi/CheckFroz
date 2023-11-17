import {Elysia, t} from "elysia";
import {bodySignIN, bodySignUP} from "../utils/endpoints.dto.ts";
import {signIn, signUp, storeRefreshToken} from "../services/auth.service.ts";


export const authRoutes = new Elysia({prefix: '/auth'})
  //@ts-ignore
  .post('/signin', async ({body, set, accessToken, refreshToken}) => {
    const user = await signIn(body, set);
    if (user?.email) {
      const token = await accessToken.sign({email: user.email, userId: user.id});
      const rToken = await refreshToken.sign({email: user.email, userId: user.id});
      storeRefreshToken(user.id, rToken).then();
      return {email: user.email, userId: user.id, token, refreshToken: rToken};
    }
    return 'Invalid Credentials';
  }, {detail: {tags: ['auth'], security: []}, body: bodySignIN})
  .post('/signup', async ({body, set}) => {
    return signUp(body, set);
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
  }, {detail: {tags: ['auth']}, security: [], body: t.Object({refreshToken: t.String()})});
