const NB_PHOTOS = 10;
const NB_COLS = 3;

const photos = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

function getRandomImage() {
  const nb = Math.floor(Math.random() * photos.length);
  return photos[nb];
}

function renderColumn(imgs: any[]) {
  return (
    <div className="flex flex-col grow gap-2.5">
      {imgs.map(d => (
        <img
          className="w-full object-cover "
          alt="photo"
          src={d}
        />
      ))}
    </div>
  );
}

function renderPhotos() {
  const imgs = [];
  const cols = [];
  for (let i = 0; i < NB_PHOTOS; i++) {
    if (
      (!(i % Math.floor(NB_PHOTOS / NB_COLS)) && i > 0) ||
      i == NB_PHOTOS - 1
    ) {
      cols.push(renderColumn([...imgs]));
      imgs.length = 0;
    }
    imgs.push(getRandomImage());
  }
  return cols;
}

export default async function Page() {
  return (
    <div
      id="app"
      className="p-2.5"
    >
      <div className="container flex flex-row max-w-5xl m-auto gap-2.5">
        {renderPhotos()}
      </div>
    </div>
  );
}
