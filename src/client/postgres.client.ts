import {
  Address,
  Alias,
  BirthDate,
  BirthPlace,
  Entity, Identification, IdentityDocument,
  Legal,
  Natural,
  PrismaClient,
  PublicationDate,
  Vessel
} from "@prisma/client"

export async function upsertPublicationDate(publicationDate: PublicationDate): Promise<PublicationDate> {
  const prisma = new PrismaClient();
  const newPublicationDate = await prisma.publicationDate.upsert({
    where: {id: publicationDate.id},
    update: publicationDate,
    create: publicationDate
  });
  prisma.$disconnect();
  return newPublicationDate;
}

export async function upsertEntity(entity: Entity): Promise<Entity> {
  const prisma = new PrismaClient();
  const newEntity = await prisma.entity.upsert({
    where: {registreId: entity?.registreId},
    update: entity,
    create: entity
  })
  prisma.$disconnect()
  return newEntity;
}

export async function upsertNatural(natural: Natural): Promise<Natural> {
  const prisma = new PrismaClient();
  const newNatural = await prisma.natural.upsert({
    where: {entityId: natural?.entityId},
    update: natural,
    create: natural
  });
  prisma.$disconnect();
  return newNatural;
}

export async function upsertLegal(legal: Legal): Promise<Legal> {
  const prisma = new PrismaClient();
  const newLegal = await prisma.legal.upsert({
    where: {entityId: legal?.entityId},
    update: legal,
    create: legal
  });
  prisma.$disconnect();
  return newLegal;
}

export async function upsertVessel(vessel: Vessel): Promise<Vessel> {
  const prisma = new PrismaClient();
  const newVessel = await prisma.vessel.upsert({
    where: {entityId: vessel?.entityId},
    update: vessel,
    create: vessel
  });
  prisma.$disconnect();
  return newVessel;
}

export async function upsertAddress(address: Address): Promise<Address> {
  const prisma = new PrismaClient();
  const newAddress = await prisma.address.upsert({
    where: {id: address?.id},
    update: address,
    create: address
  });
  prisma.$disconnect();
  return newAddress
}

export async function upsertAlias(alias: Alias): Promise<Alias> {
  const prisma = new PrismaClient();
  const newAlias = await prisma.alias.upsert({
    where: {id: alias?.id},
    update: alias,
    create: alias
  });
  prisma.$disconnect();
  return newAlias
}

export async function upsertBirthDate(birthDate: BirthDate): Promise<BirthDate> {
  const prisma = new PrismaClient();
  const newBirthDate = await prisma.birthDate.upsert({
    where: {id: birthDate?.id},
    update: birthDate,
    create: birthDate
  });
  prisma.$disconnect();
  return newBirthDate
}

export async function upsertBirtPlace(birthPlace: BirthPlace): Promise<BirthPlace> {
  const prisma = new PrismaClient();
  const newBirthPlace = await prisma.birthPlace.upsert({
    where: {id: birthPlace?.id},
    update: birthPlace,
    create: birthPlace
  });
  prisma.$disconnect();
  return newBirthPlace
}

export async function upsertIdentification(identification: Identification): Promise<Identification> {
  const prisma = new PrismaClient();
  const newIdentification = await prisma.identification.upsert({
    where: {id: identification?.id},
    update: identification,
    create: identification
  });
  prisma.$disconnect();
  return newIdentification
}

export async function upsertIdentityDocument(identityDocument: IdentityDocument): Promise<IdentityDocument> {
  const prisma = new PrismaClient();
  const newIdentityDocument = await prisma.identityDocument.upsert({
    where: {id: identityDocument?.id},
    update: identityDocument,
    create: identityDocument
  });
  prisma.$disconnect();
  return newIdentityDocument
}

// TODO CHECK With Thomas args type for prisma query
export async function getEntities(conditions?: any): Promise<Entity[]> {
  const prisma = new PrismaClient();
  const entities = await prisma.entity.findMany(conditions);
  prisma.$disconnect()
  return entities;
}

export async function getNaturals(conditions?: any): Promise<Natural[] | null> {
  const prisma = new PrismaClient();
  const naturals = await prisma.natural.findMany(conditions);
  prisma.$disconnect();
  return naturals;
}

export async function getLegals(conditions?: any): Promise<Legal[] | null> {
  const prisma = new PrismaClient();
  const legals = await prisma.legal.findMany(conditions);
  prisma.$disconnect();
  return legals;
}

export async function getVessels(conditions?: any): Promise<Vessel[] | null> {
  const prisma = new PrismaClient();
  const vessels = await prisma.vessel.findMany(conditions);
  prisma.$disconnect();
  return vessels;
}

export async function getAlias(conditions?: any): Promise<Alias[] | null> {
  const prisma = new PrismaClient();
  const aliases = await prisma.alias.findMany(conditions);
  prisma.$disconnect();
  return aliases;
}

export async function getAddresses(conditions?: any): Promise<Address[] | null> {
  const prisma = new PrismaClient();
  const addresses = await prisma.address.findMany(conditions);
  prisma.$disconnect();
  return addresses;
}

export async function getBirthDates(conditions?: any): Promise<BirthDate[] | null> {
  const prisma = new PrismaClient();
  const birthDates = await prisma.birthDate.findMany(conditions);
  prisma.$disconnect();
  return birthDates;
}

export async function getBirthPlaces(conditions?: any): Promise<BirthPlace[] | null> {
  const prisma = new PrismaClient();
  const birthPlaces = await prisma.birthPlace.findMany(conditions);
  prisma.$disconnect();
  return birthPlaces;
}

export async function getIdentifications(conditions?: any): Promise<Identification[] | null> {
  const prisma = new PrismaClient();
  const identifications = await prisma.identification.findMany(conditions);
  prisma.$disconnect();
  return identifications;
}

export async function getIdentityDocuments(conditions?: any): Promise<IdentityDocument[] | null> {
  const prisma = new PrismaClient();
  const identityDocuments = await prisma.identityDocument.findMany(conditions);
  prisma.$disconnect();
  return identityDocuments;
}

export async function getPublicationDate(): Promise<PublicationDate | null> {
  const prisma = new PrismaClient();
  const publicationDate = await prisma.publicationDate.findFirst();
  prisma.$disconnect();
  return publicationDate;
}
