async function getPhotos(): Promise<any[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

interface ParamsSlug {
  slug: string;
}

interface Params {
  params: ParamsSlug;
}

export default async function Page(params: Params) {
  const data = await getPhotos();

  return (
    <div
      id="app"
      className="p-2.5"
    >
      <div className="container flex flex-row max-w-5xl m-auto gap-2.5">
        <div className="flex flex-col grow gap-2.5">
          {data
            .filter(d => d.id < parseInt(params.params.slug))
            .map(d => (
              <img
                className="w-full object-cover "
                alt="photo"
                src={d.url}
              />
            ))}
        </div>
        <div className="flex flex-col grow gap-2.5">
          {data
            .filter(d => d.id < parseInt(params.params.slug))
            .map(d => (
              <img
                className="w-full object-cover "
                alt="photo"
                src={d.url}
              />
            ))}
        </div>
        <div className="flex flex-col grow gap-2.5">
          {data
            .filter(d => d.id < parseInt(params.params.slug))
            .map(d => (
              <img
                className="w-full object-cover "
                alt="photo"
                src={d.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
