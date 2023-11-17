import {QuerySearchDTO} from "../utils/endpoints.dto.ts";
import {PrismaClient} from "@prisma/client";
import {searchEntity} from "../utils/search-entity.ts";
import {formatData} from "../utils/data-format.ts";

export async function search(query: QuerySearchDTO): Promise<{results: any[], totalCount: number}> {
  const prisma = new PrismaClient();

  const results = await searchEntity(query, prisma);
  const formattedData = await formatData(results, prisma);

  prisma.$disconnect();

  return {results: formattedData, totalCount: formattedData.length};
}