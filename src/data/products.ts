import cadeiraAres1 from "../assets/cadeira/cadeira-ares.png";
import cadeiraAres2 from "../assets/cadeira/cadeira-ares2.png";
import cadeiraAres3 from "../assets/cadeira/cadeira-ares3.png";
import cadeiraAres4 from "../assets/cadeira/cadeira-ares4.png";

import cadeiraVariant1 from "../assets/cadeira/cadeira-ares-black-variant.png";
import cadeiraVariant2 from "../assets/cadeira/cadeira-ares-black-variant2.png";
import cadeiraVariant3 from "../assets/cadeira/cadeira-ares-black-variant3.png";
import cadeiraVariant4 from "../assets/cadeira/cadeira-ares-black-variant4.png";

import mesadeCentro1 from "../assets/mesa/mesa-de-centro-allure.png";
import mesadeCentro2 from "../assets/mesa/mesa-de-centro-allure2.png";
import mesadeCentro3 from "../assets/mesa/mesa-de-centro-allure3.png";
import mesadeCentro4 from "../assets/mesa/mesa-de-centro-allure4.png";

import mesadeCentroVariant1 from "../assets/mesa/mesa-de-centro-allure-variant.png";
import mesadeCentroVariant2 from "../assets/mesa/mesa-de-centro-allure-variant2.png";
import mesadeCentroVariant3 from "../assets/mesa/mesa-de-centro-allure-variant3.png";
import mesadeCentroVariant4 from "../assets/mesa/mesa-de-centro-allure-variant4.png";

import poltronawin1 from "../assets/poltrona/poltrona-win.png";
import poltronawin2 from "../assets/poltrona/poltrona-win2.png";
import poltronawin3 from "../assets/poltrona/poltrona-win3.png";
import poltronawin4 from "../assets/poltrona/poltrona-win4.png";

import poltronawinVariant1 from "../assets/poltrona/poltrona-win-variant.png";
import poltronawinVariant2 from "../assets/poltrona/poltrona-win-variant2.png";
import poltronawinVariant3 from "../assets/poltrona/poltrona-win-variant3.png";
import poltronawinVariant4 from "../assets/poltrona/poltrona-win-variant4.png";

import sofa1 from "../assets/sofa/sofa-3-lugares-muy.webp";
import sofa2 from "../assets/sofa/sofa-3-lugares-muy2.webp";
import sofa3 from "../assets/sofa/sofa-3-lugares-muy3.webp";
import sofa4 from "../assets/sofa/sofa-3-lugares-muy4.webp";

import sofa4lugares from "../assets/sofa/sofa-4-lugares-muy.png";
import sofa4lugares2 from "../assets/sofa/sofa-4-lugares-muy2.png";

import sofaVariant1 from "../assets/sofa/sofa-3-lugares-muy-variant.webp";
import sofaVariant2 from "../assets/sofa/sofa-3-lugares-muy-variant2.webp";
import sofaVariant3 from "../assets/sofa/sofa-3-lugares-muy-variant3.webp";
import sofaVariant4 from "../assets/sofa/sofa-3-lugares-muy-variant4.webp";

export type Variant = {
  id: string;
  color: string;
  size?: string;
  thumbnail: string; // imagem pequena (preview)
  images: string[]; // galeria completa da variant
};

export type Product = {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  variants: Variant[];
};

export const products: Product[] = [
  {
    id: 1,
    title: "Cadeira com palhinha Ares",
    subtitle: "Rattan & Madeira",
    rating: 4.6,
    price: 999.9,
    originalPrice: 1199.0,
    discountPercent: 16,
    variants: [
      {
        id: "1-default",
        color: "Nozes",
        thumbnail: cadeiraAres1,
        images: [cadeiraAres1, cadeiraAres2, cadeiraAres3, cadeiraAres4],
      },
      {
        id: "1-preto",
        color: "Preto",
        thumbnail: cadeiraVariant1,
        images: [
          cadeiraVariant1,
          cadeiraVariant2,
          cadeiraVariant3,
          cadeiraVariant4,
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Mesa de Centro Allure",
    subtitle: "Freijó Maciço",
    rating: 4.2,
    price: 1499.9,
    originalPrice: 1799.0,
    discountPercent: 17,
    variants: [
      {
        id: "2-freijo-100x60",
        color: "Freijó",
        size: "1,00m x 60cm",
        thumbnail: mesadeCentro1,
        images: [mesadeCentro1, mesadeCentro2, mesadeCentro3, mesadeCentro4],
      },
      {
        id: "2-freijo-120x80",
        color: "Freijó",
        size: "1,20m x 80cm",
        thumbnail: mesadeCentro1,
        images: [mesadeCentro1, mesadeCentro2, mesadeCentro3, mesadeCentro4],
      },
      {
        id: "2-preto-100x60",
        color: "Preto",
        size: "1,00m x 60cm",
        thumbnail: mesadeCentroVariant1,
        images: [
          mesadeCentroVariant1,
          mesadeCentroVariant2,
          mesadeCentroVariant3,
          mesadeCentroVariant4,
        ],
      },
      {
        id: "2-preto-120x80",
        color: "Preto",
        size: "1,20m x 80cm",
        thumbnail: mesadeCentroVariant1,
        images: [
          mesadeCentroVariant1,
          mesadeCentroVariant2,
          mesadeCentroVariant3,
          mesadeCentroVariant4,
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Poltrona Win",
    subtitle: "Nozes & Tecido Verde",
    rating: 4.4,
    price: 1999.9,
    originalPrice: 2299.0,
    discountPercent: 13,
    variants: [
      {
        id: "3-default",
        color: "English Green",
        thumbnail: poltronawin1,
        images: [poltronawin1, poltronawin2, poltronawin3, poltronawin4],
      },
      {
        id: "3-preto",
        color: "Preto",
        thumbnail: poltronawinVariant1,
        images: [
          poltronawinVariant1,
          poltronawinVariant2,
          poltronawinVariant3,
          poltronawinVariant4,
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Sofá 3 Lugares Muy",
    subtitle: "Mescla & Preto",
    rating: 4.8,
    price: 3599.0,
    originalPrice: 3999.0,
    discountPercent: 10,
    variants: [
      {
        id: "4-mescla-3lug",
        color: "Mescla",
        size: "3 lugares",
        thumbnail: sofa1,
        images: [sofa1, sofa2, sofa3, sofa4],
      },
      {
        id: "4-mescla-4lug",
        color: "Mescla",
        size: "4 lugares",
        thumbnail: sofa4lugares,
        images: [sofa4lugares, sofa4lugares2, sofa3, sofa4],
      },
      {
        id: "4-preto-3lug",
        color: "Preto",
        size: "3 lugares",
        thumbnail: sofaVariant1,
        images: [sofaVariant1, sofaVariant2, sofaVariant3, sofaVariant4],
      },
      {
        id: "4-preto-4lug",
        color: "Preto",
        size: "4 lugares",
        thumbnail: sofaVariant1,
        images: [sofaVariant1, sofaVariant2, sofaVariant3, sofaVariant4],
      },
    ],
  },
];
