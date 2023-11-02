import {describe, test} from "bun:test";
import _ from "lodash";
import {jsonToObject, MappedObject} from "../src/utils/import.ts";
import {importGovData} from "../src/services/import.service.ts";

describe('Import Data from Gouv API Orchestration', () => {
  test("Launch all procedure", async () => {
    await importGovData();
  });
  test("Launch all procedure from test file", async () => {
    const path = 'test/assets-test/response-data.json';
    const file = Bun.file(path);

    const requestJson = await file.json();
    const publications = _.get(requestJson, 'Publications.PublicationDetail', []);

    const mappedObject: MappedObject[] = publications.map((publication: Map<string, string | Object>) => jsonToObject(publication));

    const stringMappedObject: string = JSON.stringify(mappedObject);

    const outputFile = Bun.file('test/assets-test/output-data.json');
    await Bun.write(outputFile, stringMappedObject);
  });
});