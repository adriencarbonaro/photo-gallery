import Image from "next/image";

const NB_COLS = 3;

interface PhotoInfo {
  src: string;
  width: number;
  height: number;
}

const AWS_S3_URL = "https://adriencarbophotography.s3.eu-west-3.amazonaws.com/";

async function getData(): Promise<PhotoInfo[]> {
  const photos: PhotoInfo[] = [
    { src: AWS_S3_URL + "1.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "8.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "9.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "10.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "11.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "14.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "12.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "13.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "2.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "3.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "4.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "5.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "6.jpeg", width: 1200, height: 800 },
    { src: AWS_S3_URL + "7.jpeg", width: 1200, height: 800 },
  ];
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
