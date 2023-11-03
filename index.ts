import {Elysia} from "elysia";
import swagger from "@elysiajs/swagger";
import { cron } from '@elysiajs/cron'
import {importGovData} from "./src/services/import.service.ts";
import { rateLimit } from "elysia-rate-limit";

declare module "bun" {
  interface Env {
    PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: number;
    POSTGRES_HOST: string;
    POSTGRES_URL: string;
  }
}

const app: Elysia = new Elysia();

app.use(swagger({
  path: '/v1/doc',
  documentation: {
    info: {title: 'CheckFroz Documentation', version: '1.0.0', description: ''},
    tags: [
      {name: 'Users', description: ''}
    ]
  }
}));

// @ts-ignore
app.use(cron({name: 'import', pattern: '30 12 * * *', run: () => { importGovData().then(); }}));
// @ts-ignore
app.use(rateLimit({duration: 60 * 1000, max: 50, responseMessage: 'Too many requests'}));



app.listen(Bun.env.PORT, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});