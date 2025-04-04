import type { Metadata } from "next";


import { APP_NAME } from '@/components/data';

import Poster from "@/components/next/routes/Home/Poster"
import NineRandomTiles from "@/components/next/routes/Home/NineRandomTiles"
import SearchItemNav from "@/components/next/routes/SearchItemNav"




export const metadata: Metadata = {
  title: "Home • " + APP_NAME,
  description: APP_NAME,

};

export default function Home() {
  return (
  	<main>
  	  <Poster/>
			<SearchItemNav pathName={''}/>
			<NineRandomTiles/>
  	</main>
  );
}
