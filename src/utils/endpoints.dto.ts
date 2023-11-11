import {t} from "elysia";
import {Nature} from "@prisma/client";

export const querySearchDTO = t.Object({
  name: t.String(),
  nature: t.Enum(Nature),
  ueRef: t.Optional(t.String()),
  unRef: t.Optional(t.String()),
  firstName: t.Optional(t.String()),
  sex: t.Optional(t.Boolean()),
  nationality: t.Optional(t.String()),
  omiNumber: t.Optional(t.Integer()),
});

export type QuerySearchDTO = {
  name: string,
  nature: Nature,
  ueRef?: string,
  unRef?: string,
  firstName?: string,
  sex?: boolean,
  nationality?: string,
  omiNumber?: number
}

export type BodyBatchDTO = { entities: QuerySearchDTO[] };

export const bodyBatchDTO = t.Object({entities: t.Array(querySearchDTO)});

export const bodySignUP = t.Object({
  email: t.String(),
  password: t.String(),
  confirmedPassword: t.String()
});

export type BodySignUP = {email: string, password: string, confirmedPassword: string};

export const bodySignIN = t.Object({
  email: t.String(),
  password: t.String(),
});

export type BodySignIN = {email: string, password: string};