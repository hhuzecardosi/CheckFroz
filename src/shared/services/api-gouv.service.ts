export async function getPublicationDate(): Promise<string | undefined> {
  const response = await fetch("https://gels-avoirs.dgtresor.gouv.fr/ApiPublic/api/v1/publication/derniere-publication-date");
  if (response.status === 200)
    return response.text();
  return undefined;
}

export async function retrieveData() {
  const response = await fetch("https://gels-avoirs.dgtresor.gouv.fr/ApiPublic/api/v1/publication/derniere-publication-flux-json");
  if (response.status === 200)
    return response.json();
  return {}
}