import {BodySignIN, BodySignUP} from "../utils/endpoints.dto.ts";
import {SetType} from "../utils/set.utils.ts";
import {PrismaClient} from "@prisma/client";


export async function signIn(body: BodySignIN, set: SetType) {
  const prisma = new PrismaClient();

  const user = await prisma.users.findUnique({where: {email: body.email}});

  if (!user) {
    set.status = "Bad Request";
    throw new Error('Invalid Credentials');
  }

  const match = await Bun.password.verify(body.password, user.password);

  if (!match) {
    set.status = "Bad Request";
    throw new Error('Invalid Credentials');
  }

  set.status = "OK";
  prisma.$disconnect();
  return {email: user.email, id: user.id};
}

export async function signUp(body: BodySignUP, set: SetType) {
  const prisma = new PrismaClient();

  const user = await prisma.users.findUnique({where: {email: body.email}});

  if (user) {
    set.status = "Bad Request";
    throw new Error('User already exists');
  }

  if (body.password !== body.confirmedPassword) {
    set.status = "Bad Request";
    throw new Error('Passwords do not match');
  }

  const hashedPassword = await Bun.password.hash(body.password);

  await prisma.users.create({
    data: {
      email: body.email,
      password: hashedPassword
    }
  });

  set.status = "Created";
  prisma.$disconnect();
  return 'Account created successfully';
}

export async function storeRefreshToken(userId: string, refreshToken: string) {
  const prisma = new PrismaClient();

  await prisma.users.update({
    where: {id: userId},
    data: {refreshToken: refreshToken}
  });
  prisma.$disconnect();
}