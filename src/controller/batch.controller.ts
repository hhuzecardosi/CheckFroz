import {BodyBatchDTO} from "../utils/endpoints.dto.ts";
import {batchService} from "../services/batch.service.ts";


export async function batch(body: BodyBatchDTO) {
  return batchService(body);
}