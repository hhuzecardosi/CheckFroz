import {
  Address,
  Alias,
  BirthDate,
  BirthPlace,
  Entity,
  IdentityDocument,
  Legal,
  Natural,
  Nature,
  Vessel,
  Identification
} from "@prisma/client";
import _ from "lodash";

type Details = Detail[]
type Detail = { TypeChamp: string, Valeur: any[] }


export type MappedObject = {
  entity: Entity, alias: Alias[], natural?: Natural, legal?: Legal, vessel?: Vessel, birthDates?: BirthDate[],
  addresses?: Address[], identityDocuments?: IdentityDocument[], identifications?: Identification[], birthPlaces?: BirthPlace[]
}


export function jsonToObject(json: Map<string, Object | string>): MappedObject {
  const entity: Entity = {
    registreId: parseInt(_.get(json, 'IdRegistre', '0')),
    name: _.get(json, 'Nom', ''),
    nature: computeNature(_.get(json, 'Nature', '')),
    EUReference: getUniqueString(findInDetail(_.get(json, 'RegistreDetail', []), 'REFERENCE_UE'), 'ReferenceUe'),
    UNReference: getUniqueString(findInDetail(_.get(json, 'RegistreDetail', []), 'REFERENCE_ONU'), 'ReferenceOnu'),
    juridicalBasis: getJuridicalBasis(findInDetail(_.get(json, 'RegistreDetail', []), 'FONDEMENT_JURIDIQUE')),
    motifs: getUniqueString(findInDetail(_.get(json, 'RegistreDetail', []), 'MOTIFS'), 'Motifs')
  }

  const alias: Alias[] = getAlias(findInDetail(_.get(json, 'RegistreDetail', []), 'ALIAS'), entity.registreId);

  if (entity.nature === Nature.NATURAL) {
    const natural: Natural = {
      entityId: entity.registreId,
      firstName: getUniqueString(findInDetail(_.get(json, 'RegistreDetail', []), 'PRENOM'), 'Prenom', ''),
      sex: getBooleanSex(findInDetail(_.get(json, 'RegistreDetail', []), 'SEXE')),
      nationality: getArrayString(findInDetail(_.get(json, 'RegistreDetail', []), 'NATIONALITE'), 'Pays'),
      title: getUniqueString(findInDetail(_.get(json, 'RegistreDetail', []), 'TITRE'), 'Titre', '; '),
    }

    const birthDates: BirthDate[] = getBirthDates(findInDetail(_.get(json, 'RegistreDetail', []), 'DATE_DE_NAISSANCE'), natural.entityId);
    const birthPlaces: BirthPlace[] = getBirthPlaces(findInDetail(_.get(json, 'RegistreDetail', []), 'LIEU_DE_NAISSANCE'), natural.entityId);
    const addresses: Address[] = getAddresses(findInDetail(_.get(json, 'RegistreDetail', []), 'ADRESSE_PP'), natural.entityId, Nature.NATURAL);
    const otherIdentities: IdentityDocument[] = getIdentityDocuments(findInDetail(_.get(json, 'RegistreDetail', []), 'AUTRE_IDENTITE'), natural.entityId, false, 'NumeroCarte');
    const passports: IdentityDocument[] = getIdentityDocuments(findInDetail(_.get(json, 'RegistreDetail', []), 'PASSPORT'), natural.entityId, true, 'NumeroPassport');
    const identityDocuments: IdentityDocument[] = passports.concat(otherIdentities);

    // push objects in database or return it

    return {entity, alias, natural, birthDates, birthPlaces, addresses, identityDocuments};
  }

  if (entity.nature === Nature.LEGAL) {
    const legal: Legal = {
      entityId: entity.registreId,
      phones: getArrayString(findInDetail(_.get(json, 'RegistreDetail', []), 'TELEPHONE'), 'Telephone'),
      web: getArrayString(findInDetail(_.get(json, 'RegistreDetail', []), 'SITE_INTERNET'), 'SiteInternet'),
      mail: getArrayString(findInDetail(_.get(json, 'RegistreDetail', []), 'COURRIEL'), 'Courriel'),
    }

    const identifications: Identification[] = getIdentifications(findInDetail(_.get(json, 'RegistreDetail', []), 'IDENTIFICATION'), legal.entityId, Nature.LEGAL);
    const addresses: Address[] = getAddresses(findInDetail(_.get(json, 'RegistreDetail', []), 'ADRESSE_PM'), legal.entityId, Nature.LEGAL);

    // push objects in database
    return {entity, alias, identifications, addresses};
  }

  if (entity.nature === Nature.VESSEL) {
    let vessel: Vessel = {
      entityId: entity.registreId,
      OMINumber: getOMINumber(findInDetail(_.get(json, 'RegistreDetail', []), 'NUMERO_OMI'))
    };

    const identifications: Identification[] = getIdentifications(findInDetail(_.get(json, 'RegistreDetail', []), 'IDENTIFICATION'), vessel.entityId, Nature.VESSEL);

    // push objects in database
    return {entity, alias, identifications};
  }

  return {entity, alias};
}

function findInDetail(details: Details, field: string) {
  return details.find(x => x.TypeChamp === field) || {TypeChamp: field, Valeur: []};
}

function getUniqueString(detail: Detail, path: string, separator: string = '') {
  return detail?.Valeur?.map((val) => _.get(val, path)).join(separator);
}

function getArrayString(detail: Detail, path: string): string[] {
  return detail?.Valeur?.map(val => _.get(val, path, '').toString());
}

function getJuridicalBasis(detail: Detail) {
  return detail.Valeur?.map((val) => _.get(val, 'FondementJuridique', 0).toString() + ' - '
    + _.get(val, 'FondementJuridiqueLabel', '').trim());
}

function getOMINumber(detail: Detail): number | null {
  if (detail.Valeur.length === 0)
    return null;
  return parseInt(_.get(detail, 'Value.0.NumeroOMI', '')) || null
}

function getBooleanSex(detail: Detail) {
  const sex = detail?.Valeur?.map((val) => _.get(val, 'Sexe', '')).join('')
  if (detail.Valeur.length === 0 || sex === '')
    return null;
  return sex === 'Masculin';
}

function getAlias(detail: Detail, entityId: number): Alias[] {
  return detail?.Valeur.map((val: { Alias: string, Commentaire: string }, index: number) => {
    return {id: entityId + '/' + index, data: val?.Alias.trim(), comment: val?.Commentaire.trim(), entityId: entityId};
  });
}

function getBirthDates(detail: Detail, entityId: number): BirthDate[] {
  return detail?.Valeur?.map((val: { Jour: string, Mois: string, Annee: string, Commentaire: string }, index: number) => {
    return {
      id: entityId + '/' + index, day: parseInt(val?.Jour?.trim()), month: parseInt(val?.Mois?.trim()),
      year: parseInt(val?.Annee?.trim()), comment: val?.Commentaire?.trim(), naturalId: entityId
    };
  });
}

function getBirthPlaces(detail: Detail, entityId: number): BirthPlace[] {
  return detail?.Valeur?.map((val: { Lieu: string, Pays: string }, index: number) => {
    return {id: entityId + '/' + index, place: val?.Lieu.trim(), country: val?.Pays.trim(), naturalId: entityId};
  })
}

function getAddresses(detail: Detail, entityId: number, entity: Nature): Address[] {
  return detail?.Valeur.map((val: { Adresse: string, Pays: string }, index: number) => {
    return {
      id: entityId + '/' + index, place: val?.Adresse.trim(), country: val?.Pays.trim(),
      naturalId: entity === Nature.NATURAL ? entityId : null,
      legalId: entity === Nature.LEGAL ? entityId : null
    };
  });
}

function getIdentityDocuments(detail: Detail, entityId: number, isPassport: boolean, path: string): IdentityDocument[] {
  return detail?.Valeur.map((val, index: number) => {
    return {
      id: entityId + '/' + index, number: _.get(val, path, '').trim(),
      comment: _.get(val, 'Commentaire', '').trim(), isPassport: isPassport, naturalId: entityId
    };
  });
}

function getIdentifications(detail: Detail, entityId: number, entity: Nature): Identification[] {
  return detail?.Valeur.map((val: {Identification: string, Commentaire: string}, index: number) => {
    return {
      id: entityId + '/' + index, data: val?.Identification.trim(), comment: val?.Commentaire.trim(),
      vesselId: entity === Nature.VESSEL ? entityId : null,
      legalId: entity === Nature.LEGAL ? entityId : null
    };
  });
}


function computeNature(nature: string): Nature {
  if (nature === 'Personne physique')
    return "NATURAL";
  if (nature === 'Personne morale')
    return "LEGAL"
  if (nature === 'Navire')
    return "VESSEL"
  return "NATURAL"
}