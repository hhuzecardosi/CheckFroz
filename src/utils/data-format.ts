import {PrismaClient} from '@prisma/client';
import _ from "lodash";

export async function formatData(registreIds: { registreId: number }[], prisma: PrismaClient) {
  const entities: any[] = [];
  for await (let registreId of registreIds) {
    console.log(registreId.registreId);
    const entity = await prisma.entity.findUnique({
      where: {registreId: registreId.registreId}, include: {natural: true, legal: true, vessel: true, alias: true}
    });
    if (entity?.nature === 'NATURAL') {
      _.set(entity, 'natural.addresses', await prisma.address.findMany({where: {naturalId: entity.registreId}}));
      _.set(entity, 'natural.identityDocuments', await prisma.identityDocument.findMany({where: {naturalId: entity.registreId}}));
      _.set(entity, 'natural.birthDates', await prisma.birthPlace.findMany({where: {naturalId: entity.registreId}}));
      _.set(entity, 'natural.birthPlaces', await prisma.birthPlace.findMany({where: {naturalId: entity.registreId}}));
    }
    if (entity?.nature === 'LEGAL') {
      _.set(entity, 'legal.addresses', await prisma.address.findMany({where: {legalId: entity.registreId}}));
      _.set(entity, 'legal.identifications', await prisma.identification.findMany({where: {legalId: entity.registreId}}));
    }
    if (entity?.nature === 'VESSEL') {
      _.set(entity, 'vessel.identifications', await prisma.identification.findMany({where: {vesselId: entity.registreId}}));
    }
    entities.push(entity);
  }
  return entities;
}