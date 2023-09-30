import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { PT_Sans } from "next/font/google";
import logo_svg from "../../public/signature_white.svg";

// If loading a variable font, you don't need to specify the font weight
const pt_sans = PT_Sans({ weight: "700", subsets: ["latin"] });

interface NavItem {
  type: "text" | "img";
  name: string;
  ref: string;
}

interface TextNavItem extends NavItem {
  type: "text";
}

interface ImgNavItem extends NavItem {
  type: "img";
  link: StaticImageData;
}

type NavItemType = TextNavItem | ImgNavItem;

const navbar_items: NavItemType[] = [
  { type: "text", name: "Accueil", ref: "/" },
  { type: "text", name: "Mariages", ref: "/weddings" },
  { type: "img", name: "logo", link: logo_svg, ref: "/" },
  { type: "text", name: "Animaux", ref: "/animals" },
  { type: "text", name: "A Propos", ref: "/about" },
];

function renderNavItem(item: NavItem) {
  if (item.type === "text") {
    return (
      <Link
        key={item.name}
        className={`flex justify-center ${pt_sans.className} text-white`}
        href={item.ref}
      >
        {item.name?.toUpperCase()}
      </Link>
    );
  } else {
    return (
      <Link
        key={item.name}
        className={`flex justify-center ${pt_sans.className} h-full`}
        href={item.ref}
      >
        <Image
          className="w-max h-full"
          alt={item.name}
          src={(item as ImgNavItem).link}
        />
      </Link>
    );
  }
}

export default function Navbar() {
  return (
    <div className="navbar flex flex-row bg-stone-400 h-20 items-center justify-center gap-16 p-2.5 z-10">
      {navbar_items.map(item => renderNavItem(item))}
    </div>
  );
}
