import {
  Address,
  Alias,
  BirthDate,
  BirthPlace,
  Entity,
  Identification,
  IdentityDocument,
  Legal,
  Natural,
  PrismaClient,
  PublicationDate,
  Vessel
} from "@prisma/client"

export async function upsertPublicationDate(publicationDate: PublicationDate, prisma: PrismaClient): Promise<PublicationDate> {
  return prisma.publicationDate.upsert({
    where: {id: publicationDate.id},
    update: publicationDate,
    create: publicationDate
  });
}

export async function upsertEntity(entity: Entity, prisma: PrismaClient): Promise<Entity> {
  return prisma.entity.upsert({
    where: {registreId: entity?.registreId},
    update: entity,
    create: entity
  });
}

export async function upsertNatural(natural: Natural, prisma: PrismaClient): Promise<Natural> {
  return prisma.natural.upsert({
    where: {entityId: natural?.entityId},
    update: natural,
    create: natural
  });
}

export async function upsertLegal(legal: Legal, prisma: PrismaClient): Promise<Legal> {
  return prisma.legal.upsert({
    where: {entityId: legal?.entityId},
    update: legal,
    create: legal
  });
}

export async function upsertVessel(vessel: Vessel, prisma: PrismaClient): Promise<Vessel> {
  return prisma.vessel.upsert({
    where: {entityId: vessel?.entityId},
    update: vessel,
    create: vessel
  });
}

export async function upsertAddress(address: Address, prisma: PrismaClient): Promise<Address> {
  return prisma.address.upsert({
    where: {id: address?.id},
    update: address,
    create: address
  })
}

export async function upsertAlias(alias: Alias, prisma: PrismaClient): Promise<Alias> {
  return prisma.alias.upsert({
    where: {id: alias?.id},
    update: alias,
    create: alias
  })
}

export async function upsertBirthDate(birthDate: BirthDate, prisma: PrismaClient): Promise<BirthDate> {
  return prisma.birthDate.upsert({
    where: {id: birthDate?.id},
    update: birthDate,
    create: birthDate
  })
}

export async function upsertBirthPlace(birthPlace: BirthPlace, prisma: PrismaClient): Promise<BirthPlace> {
  return prisma.birthPlace.upsert({
    where: {id: birthPlace?.id},
    update: birthPlace,
    create: birthPlace
  })
}

export async function upsertIdentification(identification: Identification, prisma: PrismaClient): Promise<Identification> {
  return prisma.identification.upsert({
    where: {id: identification?.id},
    update: identification,
    create: identification
  })
}

export async function upsertIdentityDocument(identityDocument: IdentityDocument, prisma: PrismaClient): Promise<IdentityDocument> {
  return prisma.identityDocument.upsert({
    where: {id: identityDocument?.id},
    update: identityDocument,
    create: identityDocument
  })
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
