import {QuerySearchDTO} from "../utils/endpoints.dto.ts";
import {searchService} from "../services/search.service.ts";

export async function search(query: QuerySearchDTO) {
  return searchService(query);
}