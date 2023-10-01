import Image from "next/image";
import { basename } from "path";
import { type PhotoItem } from "@/app/db";
import { type ParamsProp } from "@/app/types";
import { getGalleryMetadata, getGalleryPhotos } from "@/app/s3";

import "@/app/page.css";

const NB_COLS = 3;

interface GalleryParam {
  gallery_name: string;
}

interface Gallery {
  name: string;
  photos: PhotoItem[];
}

type Galleries = Gallery[];

async function createGallery(photo: string, name: string, gallery_id: string) {
  const gallery_metadata = await getGalleryMetadata(name, gallery_id);
  if (gallery_metadata) {
    return {
      name: gallery_metadata.name,
      photos: [{ alt: gallery_id, src: photo }],
    };
  }
}

async function createGalleries(name: string, photos: string[]) {
  const galleries: Galleries = [];
  for (const photo of photos) {
    const split = photo.split("/");
    const gallery_id = split[split.length - 2];
    const gallery = galleries.find(
      gallery => gallery.photos[0].alt === gallery_id,
    );
    if (gallery) {
      gallery.photos.push({ src: photo, alt: gallery_id });
    } else {
      const gallery = await createGallery(photo, name, gallery_id);
      if (gallery) galleries.push(gallery);
    }
  }
  return galleries;
}

async function getGalleryData(name: string): Promise<Galleries> {
  const items = await getGalleryPhotos(name);
  const photos = items.filter(item => !item.match("json"));
  return createGalleries(name, photos);
}

export default async function Page(props: ParamsProp<GalleryParam>) {
  const galleries = await getGalleryData(props.params.gallery_name);

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
      <div className="flex flex-col gap-2.5">
        {galleries.map(gallery => {
          return (
            <div
              key="1"
              className="flex flex-col max-w-5xl m-auto gap-2.5"
            >
              <div>{gallery.name}</div>
              <div className="container flex flex-row max-w-5xl m-auto gap-2.5">
                {renderPhotos(gallery.photos)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
