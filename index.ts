import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import {
  ClientSecretCredential,
  DefaultAzureCredential,
} from "@azure/identity";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("Connecting to Azure Blob Storage");

  const tenantId = process.env.AZURE_TENANT_ID as string;
  const clientId = process.env.AZURE_CLIENT_ID as string;
  const clientSecret = process.env.AZURE_CLIENT_SECRET as string;
  const url = process.env.VAA_BLOB_STORAGE_URL as string;
  const containerName = process.env.VAA_BLOB_STORAGE_CONTAINER as string;

  const clientCredential = new ClientSecretCredential(
    tenantId,
    clientId,
    clientSecret
  );

  const defaultCredentials = new DefaultAzureCredential();

  const blobServiceClient = new BlobServiceClient(url, defaultCredentials);

  const container = blobServiceClient.getContainerClient(containerName);

  //get
  // const content = fs.readFileSync(
  //   "files/i6_FMS_AP_2022-06-07T07_31_01.457Z.csv",
  //   "utf8"
  // );

  // create
  // const content = "Hello world!";
  // const blobName = "AP/i6_FMS_AP_2022-06-07T07_31_01.457Z.csv";

  // const uploadBlobResponse = await container.uploadBlockBlob(
  //   blobName,
  //   content,
  //   content.length
  // );

  // console.log(
  //   `Uploaded block blob ${blobName} successfully`,
  //   uploadBlobResponse
  // );
  // console.log(
  //   `Uploaded block blob ${blobName} successfully`,
  //   uploadBlobResponse.response
  // );

  // console.log(
  //   `Upload block blob ${blobName} successfully`,
  //   uploadBlobResponse.blockBlobClient
  // );

  // delete
  // await container.deleteBlob("test/newTestblob1649834358458");

  // list
  let i = 1;
  for await (const blob of container.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // const blockBlobClient = container.getBlockBlobClient(
  //   "STAT/i6_FMS_GL_STAT_2022-04-13T06:00:47.086Z.csv"
  // );

  // const result = await blockBlobClient.exists();
  // console.log(result);
  //   const client = new ContainerClient(url, clientCredential);

  // const blockBlobClient = container.getBlockBlobClient(blobName);
  // const uploadBlobResponse = await blockBlobClient.upload(
  //   content,
  //   content.length
  // );

  // for await (const item of container.listBlobsByHierarchy("/")) {
  //   if (item.kind === "prefix") {
  //     console.log(`\tBlobPrefix: ${item.name}`);
  //   } else {
  //     console.log(
  //       `\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`
  //     );
  //   }
  // }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
