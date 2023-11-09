import {BodyBatchDTO} from "../utils/endpoints.dto.ts";
import {PrismaClient} from "@prisma/client";
import {searchEntity} from "../utils/search-entity.ts";
import {formatData} from "../utils/data-format.ts";

export async function batchService(query: BodyBatchDTO): Promise<{results: any[]}[]> {
  const results = [];
  let position = 0;
  const prisma = new PrismaClient();
  for await (const entityDto of query.entities) {
    const entityResults = await searchEntity(entityDto, prisma);
    const formattedData = await formatData(entityResults, prisma);
    results.push({results: formattedData, totalCount: formattedData.length, position:  position ++});
  }
  return results;
}