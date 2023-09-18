import Image from "next/image";

const NB_COLS = 3;

interface PhotoInfo {
  src: string;
  width: number;
  height: number;
}

async function getData(): Promise<PhotoInfo[]> {
  const res = await fetch("http://localhost:3000/api", {
    next: { revalidate: 5 },
  });

  const json_doc = await res.json();
  const photos = json_doc.photos;
  return photos;
}

export default async function Page() {
  const photos = await getData();

  function renderImg(photo: PhotoInfo) {
    return (
      <Image
        key={photo.src}
        alt={photo.src}
        src={photo.src}
        width={photo.width}
        height={photo.height}
        placeholder="blur"
        blurDataURL="/blur.png"
      />
    );
  }

  function renderColumns(cols: PhotoInfo[][]) {
    return cols.map(col => {
      return (
        <div className="flex flex-col grow gap-2.5">
          {col.map(photo => renderImg(photo))}
        </div>
      );
    });
  }

  function renderPhotos(photos: PhotoInfo[]) {
    const nb_photos = photos.length;
    let j = 0;
    const cols: PhotoInfo[][] = [];
    for (let k = 0; k < NB_COLS; k++) {
      cols.push(new Array<PhotoInfo>());
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
