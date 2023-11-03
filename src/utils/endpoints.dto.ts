import {t} from "elysia";

export const querySearchDTO= t.Object({
  name: t.String(),
  nature: t.String(),
  ueRef: t.Optional(t.String()),
  unRef: t.Optional(t.String()),
  firstName: t.Optional(t.String()),
  sex: t.Optional(t.Boolean()),
  nationality: t.Optional(t.String()),
  omiNumber: t.Optional(t.String()),
});

export const bodyBatchDTO= t.Object({entities: t.Array(querySearchDTO)});