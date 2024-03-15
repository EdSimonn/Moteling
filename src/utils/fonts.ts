/** @format */

import { Barlow, Merriweather, Pacifico, Roboto } from "next/font/google";

const barlow_init = Barlow({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-barlow",
});

const pacifico_init = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

const merriweather_init = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

export const barlow = barlow_init.className;
export const pacifico = pacifico_init.className;
export const merriweather = merriweather_init.className;
