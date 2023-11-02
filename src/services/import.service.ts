import {
  Address,
  Alias,
  BirthDate,
  BirthPlace,
  Entity, Identification,
  IdentityDocument,
  Legal,
  Natural,
  PrismaClient,
  Vessel
} from "@prisma/client";
import {
  getPublicationDate, upsertAddress,
  upsertAlias, upsertBirthDate, upsertBirthPlace,
  upsertEntity, upsertIdentification, upsertIdentityDocument, upsertLegal,
  upsertNatural,
  upsertPublicationDate, upsertVessel
} from "../client/postgres.client.ts";
import {getAPIPublicationDate, retrieveDataFromGovAPI} from "../client/api-gouv.client.ts";
import moment from "moment/moment";
import _ from "lodash";
import {jsonToObject, MappedObject} from "../utils/import.ts";

export async function importGovData() {
  const prisma = new PrismaClient();

  const publicationDate = (await getPublicationDate())?.publicationDate;
  const govPublicationDateData = await getAPIPublicationDate();
  const govPublicationDate = moment(govPublicationDateData, 'DD/MM/YYYY hh:mm:ss')?.toDate();

  if (publicationDate === undefined || publicationDate < govPublicationDate) {

    upsertPublicationDate({id: 0, publicationDate: govPublicationDate}, prisma).then();

    const dataGov = await retrieveDataFromGovAPI();
    const publications = _.get(dataGov, 'Publications.PublicationDetail', []);
    const mappedObjects: MappedObject[] = publications.map((publication: Map<string, string | Object>) => jsonToObject(publication));

    const entities: Entity[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.entity);
    const aliases: Alias[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.alias).flat();

    const naturals: Natural[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.natural)
      .filter((natural: Natural | undefined): natural is Natural => natural !== undefined);
    const legals: Legal[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.legal)
      .filter((legal: Legal | undefined): legal is Legal => legal !== undefined);
    const vessels: Vessel[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.vessel)
      .filter((vessel: Vessel | undefined): vessel is Vessel => vessel !== undefined);

    const addresses: Address[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.addresses).flat()
      .filter((addresses: Address | undefined): addresses is Address => addresses !== undefined);
    const birthDates: BirthDate[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.birthDates).flat()
      .filter((birthDates: BirthDate | undefined): birthDates is BirthDate => birthDates !== undefined);
    const birthPlaces: BirthPlace[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.birthPlaces).flat()
      .filter((birthPlaces: BirthPlace | undefined): birthPlaces is BirthPlace => birthPlaces !== undefined);
    const identityDocuments: IdentityDocument[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.identityDocuments).flat()
      .filter((identityDocuments: IdentityDocument | undefined): identityDocuments is IdentityDocument => identityDocuments !== undefined);
    const identifications: Identification[] = mappedObjects.map((mappedObject: MappedObject) => mappedObject.identifications).flat()
      .filter((identifications: Identification | undefined): identifications is Identification => identifications !== undefined);

    for (const entity of entities) { await upsertEntity(entity, prisma) }
    for (const alias of aliases) { await upsertAlias(alias, prisma) }
    for (const natural of naturals) { await upsertNatural(natural, prisma) }
    for (const legal of legals) { await upsertLegal(legal, prisma) }
    for (const vessel of vessels) { await upsertVessel(vessel, prisma) }
    for (const address of addresses) { await upsertAddress(address, prisma) }
    for (const birthDate of birthDates) { await upsertBirthDate(birthDate, prisma) }
    for (const birthPlace of birthPlaces) { await upsertBirthPlace(birthPlace, prisma) }
    for (const identityDocument of identityDocuments) { await upsertIdentityDocument(identityDocument, prisma) }
    for (const identification of identifications) { await upsertIdentification(identification, prisma) }

  } else {
    console.log('No new data to import');
  }
  prisma.$disconnect();
}
