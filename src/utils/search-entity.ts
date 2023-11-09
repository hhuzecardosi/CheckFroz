import {Nature, PrismaClient} from "@prisma/client";
import {QuerySearchDTO} from "./endpoints.dto.ts";

export async function searchEntity(query: QuerySearchDTO, prisma: PrismaClient): Promise<{registreId: number}[]> {
  const AND: any[] = [];
  const OR: any[] = [];

  AND.push({nature: query.nature === 'NATURAL' ? Nature.NATURAL : query.nature === 'LEGAL' ? Nature.LEGAL : Nature.VESSEL})

  query?.name ? AND.push({OR: [{name: {contains: query.name, mode: 'insensitive'}},{alias: {some: {data: {contains: query.name, mode: 'insensitive'}}}}]}) : undefined;
  query?.firstName ? OR.push({OR: [{natural: {firstName: {contains: query.firstName, mode: 'insensitive'}}},{alias: {some: {data: {contains: query.firstName, mode: 'insensitive'}}}}]}) : undefined;
  query?.ueRef ? OR.push({EUReference: {contains: query.ueRef, mode: 'insensitive'}}) : undefined;
  query?.unRef ? OR.push({UNReference: {contains: query.unRef, mode: 'insensitive'}}) : undefined;
  query?.omiNumber ? OR.push({vessel: {OMINumber: query.omiNumber}}) : undefined;
  query?.nationality ? OR.push({natural: {nationality: {has: query.nationality}}}) : undefined;
  query?.sex !== undefined ? OR.push({natural: {sex: query.sex}}) : undefined;

  AND.push({OR: OR})

  const request = {where: {AND: AND}, select: {registreId: true}};

  //@ts-ignore
  const results = await prisma.entity.findMany(request);

  console.log(results);

  return results;
}