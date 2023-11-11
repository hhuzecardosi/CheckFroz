import { PrismaClient } from "@prisma/client";
import {Elysia} from "elysia";
import _ from "lodash";

export const isAuthenticated = (app: Elysia) =>
  // @ts-ignore
  app.derive(async ({headers, accessToken, set}) => {
    console.log(headers);
    const token = _.get(headers, 'authorization', undefined);
    if (!token){
      set.status = 401;
      return "Unauthorized";
    }
    const decoded = await accessToken.verify(token);
    console.log(decoded);
    if (!decoded){
      set.status = 401;
      return "Token expired";
    }
    const prisma = new PrismaClient();
    const user = await prisma.users.findUnique({where: {email: decoded.email}});
    if (!user){
      set.status = 401;
      return "Unauthorized";
    }
    return user;
  })