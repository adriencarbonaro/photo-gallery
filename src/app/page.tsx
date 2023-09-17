import Image from "next/image";

const NB_COLS = 3;

interface PhotoInfo {
  src: string;
  width: number;
  height: number;
}

interface PhotoList {
  photos: PhotoInfo[];
}

interface Props<T> {
  props: T;
}

export async function getData(): Promise<PhotoInfo[]> {
  const result_json = {
    photos: [
      { src: "/1.jpg", width: 1150, height: 768 },
      { src: "/2.jpg", width: 1150, height: 768 },
      { src: "/3.jpg", width: 1024, height: 683 },
      { src: "/4.jpg", width: 1024, height: 683 },
      { src: "/5.jpg", width: 1150, height: 768 },
      { src: "/6.jpg", width: 1150, height: 768 },
      { src: "/7.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/1.jpg", width: 1150, height: 768 },
      { src: "/2.jpg", width: 1150, height: 768 },
      { src: "/3.jpg", width: 1024, height: 683 },
      { src: "/4.jpg", width: 1024, height: 683 },
      { src: "/5.jpg", width: 1150, height: 768 },
      { src: "/6.jpg", width: 1150, height: 768 },
      { src: "/7.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/1.jpg", width: 1150, height: 768 },
      { src: "/2.jpg", width: 1150, height: 768 },
      { src: "/3.jpg", width: 1024, height: 683 },
      { src: "/4.jpg", width: 1024, height: 683 },
      { src: "/5.jpg", width: 1150, height: 768 },
      { src: "/6.jpg", width: 1150, height: 768 },
      { src: "/7.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/1.jpg", width: 1150, height: 768 },
      { src: "/2.jpg", width: 1150, height: 768 },
      { src: "/3.jpg", width: 1024, height: 683 },
      { src: "/4.jpg", width: 1024, height: 683 },
      { src: "/5.jpg", width: 1150, height: 768 },
      { src: "/6.jpg", width: 1150, height: 768 },
      { src: "/7.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
      { src: "/8.jpg", width: 1024, height: 683 },
    ],
  };
  const photos = result_json.photos;

  return photos;
}

export default async function Page() {
  const photos = await getData();

  function renderColumn(photos: PhotoInfo[]) {
    return (
      <div className="flex flex-col grow gap-2.5">
        {photos.map(photo => (
          <Image
            alt={photo.src}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            blurDataURL="https://picsum.photos/id/1060/536/354?blur=2"
          />
        ))}
      </div>
    );
  }

  function renderPhotos(photos: PhotoInfo[]) {
    const nb_photos = photos.length;
    const imgs = [];
    const cols = [];

    for (let i = 0; i < NB_COLS; i++) {
      if (i === NB_COLS - 1) {
        console.log(
          photos.slice(i * Math.trunc(nb_photos / NB_COLS), nb_photos),
        );
      } else {
        console.log(
          photos.slice(
            i * Math.trunc(nb_photos / NB_COLS),
            (i + 1) * Math.trunc(nb_photos / NB_COLS),
          ),
        );
      }
    }

    for (let i = 0; i < nb_photos; i++) {
      imgs.push(photos[i]);
      if (
        !((i + 1) % Math.trunc(nb_photos / NB_COLS)) ||
        nb_photos - i < Math.trunc(nb_photos / NB_COLS)
      ) {
        cols.push(renderColumn([...imgs]));
        imgs.length = 0;
      }
    }
    return cols;
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
