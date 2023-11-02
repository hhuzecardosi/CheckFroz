export async function getAPIPublicationDate(): Promise<string | undefined> {
  const response = await fetch("https://gels-avoirs.dgtresor.gouv.fr/ApiPublic/api/v1/publication/derniere-publication-date");
  if (response.status === 200)
    return response.text();
  return undefined;
}

export async function retrieveDataFromGovAPI() {
  const response = await fetch("https://gels-avoirs.dgtresor.gouv.fr/ApiPublic/api/v1/publication/derniere-publication-flux-json");
  if (response.status === 200)
    return response.json();
  return {}
}