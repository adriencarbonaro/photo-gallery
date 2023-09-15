import { Props } from "@/app/props";

const navbar_elems = ["Accueil", "Mariages", "Animaux", "A propos"];

export default function Navbar(props: Props) {
  return (
    <div className="flex flex-row bg-slate-100 h-20 items-center justify-center gap-2.5">
      {navbar_elems.map(elem => (
        <div
          key={elem}
          className="elem"
        >
          {elem}
        </div>
      ))}
    </div>
  );
}
