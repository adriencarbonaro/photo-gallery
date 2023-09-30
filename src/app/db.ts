import { MongoClient, ServerApiVersion } from "mongodb";

const USERNAME = "adrien_carbonaro";
const PASSWORD = "Dekide.mongodb*1.09";
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.eafvghc.mongodb.net/?retryWrites=true&w=majority`;
const DB = "photo_gallery";

export interface ServerItem {
  url: string;
}

export interface PhotoItem {
  alt: string;
  src: string;
}

export interface CollectionItem {
  name: string;
  dir: string;
  photos: PhotoItem[] | "all";
}

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function getServer() {
  try {
    await client.connect();
    const doc = await client.db(DB).collection("server").findOne<ServerItem>();
    return doc as ServerItem;
  } finally {
    await client.close();
  }
}

export async function getAll<T>(collection: string) {
  try {
    await client.connect();
    const cursor = await client.db(DB).collection(collection).find();
    const array = await cursor.toArray();
    return array as T[];
  } finally {
    await client.close();
  }
}
