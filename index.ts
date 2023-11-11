import {Elysia, MaybePromise} from "elysia";
import swagger from "@elysiajs/swagger";
import {cron} from '@elysiajs/cron'
import {importGovData} from "./src/services/import.service.ts";
import {rateLimit} from "elysia-rate-limit";
import {searchRoutes} from "./src/routes/search.routes.ts";
import {batchRoutes} from "./src/routes/batch.routes.ts";
import {jwt} from "@elysiajs/jwt";

declare module "bun" {
  interface Env {
    PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: number;
    POSTGRES_HOST: string;
    POSTGRES_URL: string;
    JWT_SECRET: string;
  }
}

const app: Elysia = new Elysia();

app.use(swagger({
  path: '/v1/doc',
  documentation: {
    security : [
      { BearerAuth: [] }
    ],
    info: {title: 'CheckFroz Documentation', version: '1.0.0', description: ''},
    tags: [
      {
        name: 'search',
        description: 'Search endpoint for CheckFroz. Search for a single entity from the French Tresor Public database.'
      },
      {
        name: 'batch',
        description: 'Batch endpoint for CheckFroz. Search for multiple entities from the French Tresor Public database.'
      },
      {
        name: 'users',
        description: 'User endpoint for CheckFroz. Sign in, sign up, and sign out.'
      }
    ]
  }
}));

app.group('/api', (app) =>
  // @ts-ignore
  app.use(cron({
    name: 'import', pattern: '30 12 * * *', run: () => {
      importGovData().then();
    }
  }))
    // @ts-ignore
    .use(rateLimit({
      duration: 60 * 1000,
      max: 50,
      responseMessage: 'Too many requests',
      // @ts-ignore
      generator(request: Request): MaybePromise<string> {
      }
    }))
    // @ts-ignore
    .use(jwt({name: 'accessToken', secret: Bun.env.JWT_SECRET, exp: '1d'}))
    // @ts-ignore
    .use(jwt({name: 'refreshToken', secret: Bun.env.JWT_SECRET, exp: '7m'}))
    .use(searchRoutes)
    .use(batchRoutes)
);
// @ts-ignore


app.listen(Bun.env.PORT, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});