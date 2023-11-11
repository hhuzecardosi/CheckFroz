import { PrismaClient } from "@prisma/client";
import {Elysia} from "elysia";
import _ from "lodash";

export const isAuthenticated = new Elysia()
  // @ts-ignore
  .derive(async ({headers, accessToken, set}) => {
    const token = _.get(headers, 'authorization', undefined);
    if (!token){
      set.status = 401;
      throw new Error("Unauthorized");
    }
    const decodedToken = await accessToken.verify(token);
    if (!decodedToken){
      set.status = 401;
      throw new Error("Token expired");
    }
    const prisma = new PrismaClient();
    const user = await prisma.users.findUnique({where: {email: decodedToken.email}});
    if (!user){
      set.status = 401;
      throw new Error("Unauthorized");
    }
    return user;
  })