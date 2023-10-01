import Image from "next/image";
import { basename } from "path";
import { type PhotoItem } from "@/app/db";
import { type ParamsProp } from "@/app/types";
import { getShootingPhotos } from "@/app/s3";

import "@/app/page.css";

const NB_COLS = 3;

interface ShootingProps {
  shooting_name: string;
}

async function getShootingData(name: string): Promise<PhotoItem[]> {
  const photos = await getShootingPhotos(name);
  const data: PhotoItem[] = [];
  for (const photo of photos) {
    data.push({ src: photo, alt: name });
  }
  return data;
}

export default async function Page(props: ParamsProp<ShootingProps>) {
  const photos = await getShootingData(props.params.shooting_name);

  function renderImg(photo: PhotoItem) {
    return (
      <a
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
      </a>
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
