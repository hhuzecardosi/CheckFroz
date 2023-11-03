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

export async function getPublicationDate(): Promise<PublicationDate | null> {
  const prisma = new PrismaClient();
  const publicationDate = await prisma.publicationDate.findFirst();
  prisma.$disconnect();
  return publicationDate;
}
