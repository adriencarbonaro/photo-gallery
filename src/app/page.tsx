export default function Home() {
  return (
    <div
      id="app"
      className="p-2.5"
    >
      <div className="container flex flex-row max-w-5xl m-auto gap-2.5">
        <div className="flex flex-col grow gap-2.5">
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image2.jpg"
          />
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image1.jpg"
          />
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image1.jpg"
          />
        </div>
        <div className="flex flex-col grow gap-2.5">
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image1.jpg"
          />
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image1.jpg"
          />
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image2.jpg"
          />
        </div>
        <div className="flex flex-col grpw gap-2.5">
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image2.jpg"
          />
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image1.jpg"
          />
          <img
            className="w-full object-cover "
            alt="photo"
            src="/image2.jpg"
          />
        </div>
      </div>
    </div>
  );
}
