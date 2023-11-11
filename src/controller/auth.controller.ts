import {BodySignIN, BodySignUP} from "../utils/endpoints.dto.ts";
import {signINService, signUPService} from "../services/auth.service.ts";
import {SetType} from "../utils/set.utils.ts";


export async function signIN(body: BodySignIN, set: SetType) {
  return signINService(body, set);
}

export async function signUP(body: BodySignUP, set: SetType) {
  return signUPService(body, set)
}

export async function checkRefresh(refreshToken: string, set: SetType) {
  return
}