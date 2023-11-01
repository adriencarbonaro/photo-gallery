import {
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const BUCKET = "adriencarbophotography";
const REGION = "eu-west-3";
const URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com/`;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

interface GalleryMetadata {
  name: string;
}

async function getPhotos(prefix: string, name: string) {
  const array = [];
  const res = await s3Client.send(
    new ListObjectsCommand({
      Bucket: BUCKET,
      Prefix: `${prefix}/${name}`,
    }),
  );
  if (res.Contents) {
    for (const item of res.Contents) {
      if (item.Key?.includes("jpg")) {
        array.push(URL + item.Key);
      }
    }
  }
  return array;
}

async function getMetadata<T>(prefix: string, name: string, sub_name: string) {
  const res = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: `${prefix}/${name}/${sub_name}/metadata.json`,
    }),
  );
  const item = await res.Body?.transformToString();
  if (item) {
    const doc = JSON.parse(item) as T;
    return doc;
  }
  return undefined;
}

export async function getGalleryPhotos(name: string) {
  return await getPhotos("galleries", name);
}

export async function getGalleryMetadata(name: string, subname: string) {
  return await getMetadata<GalleryMetadata>("galleries", name, subname);
}

export async function getShootingPhotos(name: string) {
  return await getPhotos("shootings", name);
}
