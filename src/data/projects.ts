export interface Project {
  slug: string;
  number: string;
  name: string;
  year: string | null;
  disciplines: string[];
  cover: string;
  assets: { identity: string; digital: string; system: string };
  theme: string;
  credits: string;
  provisional: boolean;
}
export const projects: Project[] = [
  {
    slug: "nogueira",
    number: "01",
    name: "Nogueira",
    year: null,
    disciplines: ["Brand identity", "Art direction", "Digital experience"],
    cover: "/assets/nogueira-original-cartoes.webp",
    assets: {
      identity: "/assets/nogueira-original-caneca.webp",
      digital: "/assets/nogueira-original-caneca.webp",
      system: "/assets/nogueira-original-cartoes.webp",
    },
    theme: "red-black",
    credits: "Elevarte — mockups originais do manual de identidade Nogueira",
    provisional: false,
  },
  {
    slug: "aol",
    number: "02",
    name: "AOL Advogados",
    year: null,
    disciplines: ["Brand identity", "Art direction"],
    cover: "/assets/aol-cover.webp",
    assets: {
      identity: "/assets/aol-cover.webp",
      digital: "/assets/aol-cover.webp",
      system: "/assets/aol-cover.webp",
    },
    theme: "monochrome",
    credits: "Elevarte — estudo visual provisório",
    provisional: true,
  },
  {
    slug: "tatiana",
    number: "03",
    name: "Dra. Tatiana Sanchez",
    year: null,
    disciplines: ["Brand identity", "Art direction"],
    cover: "/assets/tatiana-original-cosmetico.webp",
    assets: {
      identity: "/assets/tatiana-original-cosmetico.webp",
      digital: "/assets/tatiana-original-cartoes.webp",
      system: "/assets/tatiana-original-cartoes.webp",
    },
    theme: "rose",
    credits:
      "Elevarte — mockups originais da identidade Dra. Tatiana Sanchez",
    provisional: false,
  },
];
