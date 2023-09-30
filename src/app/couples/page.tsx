import Image from "next/image";
import { basename, join } from "path";
import { type CollectionItem, getAll, type PhotoItem, getServer } from "../db";

import "@/app/couples/page.css";
import Link from "next/link";

const NB_COLS = 3;

async function getData(): Promise<PhotoItem[]> {
  const server_doc = await getServer();
  const couples = await getAll<CollectionItem>("couples");
  const photos: PhotoItem[] = [];
  couples.map(couple => {
    couple.photos.map(photo =>
      photos.push({
        src: join(server_doc.url, "couples", couple.dir, photo.src),
        alt: photo.alt,
      }),
    );
  });
  return photos;
}

export default async function Page() {
  const photos = await getData();

  function renderImg(photo: PhotoItem) {
    return (
      <Link
        target="_blank"
        href={photo.src}
        className="photo-container"
      >
        <div className="photo-meta">{basename(photo.src)}</div>
        <Image
          className="photo"
          key={photo.src}
          alt={photo.alt}
          src={photo.src}
          width={1200}
          height={800}
        />
      </Link>
    );
  }

  function renderColumns(cols: PhotoItem[][]) {
    return cols.map((col, idx) => {
      return (
        <div
          key={idx}
          className="flex flex-col grow gap-2.5"
        >
          {col.map(photo => renderImg(photo))}
        </div>
      );
    });
  }

  function renderPhotos(photos: PhotoItem[]) {
    const nb_photos = photos.length;
    let j = 0;
    const cols: PhotoItem[][] = [];
    for (let k = 0; k < NB_COLS; k++) {
      cols.push(new Array<PhotoItem>());
    }

    for (let i = 0; i < nb_photos; i++) {
      cols[j].push(photos[i]);
      j = (j + 1) % NB_COLS;
    }
    return renderColumns(cols);
  }

  return (
    <div
      id="app"
      className="p-2.5"
    >
      <div className="container flex flex-row max-w-5xl m-auto gap-2.5">
        {renderPhotos(photos)}
      </div>
    </div>
  );
}
