import { Props } from "@/app/props";
import Link from "next/link";

import { PT_Sans } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const pt_sans = PT_Sans({ weight: "700", subsets: ["latin"] });

interface NavItem {
  type: "text" | "img";
  link?: string;
  name?: string;
  ref: string;
}

const navbar_items: NavItem[] = [
  { type: "text", name: "Accueil", ref: "/" },
  { type: "text", name: "Mariages", ref: "/weddings" },
  { type: "img", link: "sig.png", ref: "/" },
  { type: "text", name: "Animaux", ref: "/animals" },
  { type: "text", name: "A Propos", ref: "/about" },
];

function renderNavItem(item: NavItem) {
  if (item.type === "text") {
    return (
      <Link
        className={`${pt_sans.className} text-white`}
        href={item.ref}
      >
        {item.name?.toUpperCase()}
      </Link>
    );
  } else {
    return (
      <Link
        className={`${pt_sans.className} h-full`}
        href={item.ref}
      >
        <img
          className="h-full"
          src={item.link}
        />
      </Link>
    );
  }
}

export default function Navbar(props: Props) {
  return (
    <div className="navbar flex flex-row bg-stone-400 h-20 items-center justify-center gap-16 p-2.5">
      {navbar_items.map(item => renderNavItem(item))}
    </div>
  );
}
