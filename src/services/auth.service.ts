import {PrismaClient} from "@prisma/client";
import {BodySignIN, BodySignUP} from "../utils/endpoints.dto.ts";
import {SetType} from "../utils/set.utils.ts";


export async function signUPService(userDto: BodySignUP, set: SetType) {
  // check if user email exists
  const prisma = new PrismaClient();

  const user = await prisma.users.findUnique({where: {email: userDto.email}});

  if (user) {
    set.status = "Bad Request";
    throw new Error('User already exists');
  }

  if (userDto.password !== userDto.confirmedPassword) {
    set.status = "Bad Request";
    throw new Error('Passwords do not match');
  }

  const hashedPassword = await Bun.password.hash(userDto.password);

  await prisma.users.create({
    data: {
      email: userDto.email,
      password: hashedPassword
    }
  });

  set.status = "Created";
  prisma.$disconnect();
  return 'Account created successfully';
}

export async function signINService(userDto: BodySignIN, set: SetType) {
  const prisma = new PrismaClient();

  const user = await prisma.users.findUnique({where: {email: userDto.email}});

  if (!user) {
    set.status = "Bad Request";
    throw new Error('Invalid Credentials');
  }

  const match = await Bun.password.verify(userDto.password, user.password);

  if (!match) {
    set.status = "Bad Request";
    throw new Error('Invalid Credentials');
  }

  set.status = "OK";
  prisma.$disconnect();
  return {email: user.email, id: user.id};
}

export async function storeRefreshToken(userId: number, refreshToken: string) {
  const prisma = new PrismaClient();

  await prisma.users.update({
    where: {id: userId},
    data: {refreshToken: refreshToken}
  });
  prisma.$disconnect();
}
