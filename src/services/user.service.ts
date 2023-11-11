import {PrismaClient} from "@prisma/client";
import {jwt} from "@elysiajs/jwt";
import {BodySignIN} from "../utils/endpoints.dto.ts";


export async function create(userDto: BodySignIN) {
  // check if user email exists
  const prisma = new PrismaClient();

  const user = await prisma.users.findUnique({where: {email: userDto.email}});

  if (user){ console.log('user already exists'); return;}

  if (userDto.password === userDto.confirmedPassword) { console.log('passwords do not match'); return; }

  // hash password
  const hashedPassword = await Bun.password.hash(userDto.password);
  // create user
  const newUser = await prisma.users.create({
    data: {
      email: userDto.email,
      password: hashedPassword
    }
  });
  jwt({name: 'jwt', secret: 'secret'});
  // generate token
  // return user without password and token
}