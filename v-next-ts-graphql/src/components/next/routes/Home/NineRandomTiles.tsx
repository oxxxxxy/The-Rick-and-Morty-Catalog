'use client';
import { useState, useEffect, useRef } from 'react';
  

import type { TileItems, ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';
import { randomTileWraps, getSomeRandomTiles } from '@tsCF/pages/src/routes/Home/NineRandomTiles.ts';

import { 
	API_CHARACTERS__PATH,
	API_EPISODES__PATH,
	API_LOCATIONS__PATH
} from '@tsCF/data';


import TileBoard from '@/components/next/tileBoard/TileBoard';
import CharacterTile from '@/components/next/tileBoard/tiles/CharacterTile';
import EpisodeTile from '@/components/next/tileBoard/tiles/EpisodeTile';
import LocationTile from '@/components/next/tileBoard/tiles/LocationTile';

import { useGlobalContext } from '@/components/context/globalContext';




export default function NineRandomTiles() {
	const [ content, setContent ] = useState<React.ReactNode>(<p>Loading</p>);	
	const { wUrql } = useGlobalContext();
	const didItExec = useRef(false);	

	useEffect(() => {
		const action = async ():Promise<void> => {
			if(didItExec.current){
				return;
			}

			didItExec.current = true;
	

			const tiles: TileItems | ERR = await getSomeRandomTiles(wUrql, randomTileWraps);
	
			if(tiles === 'ERR'){
				setContent(
					<p>Network Error. Try later or kill yourself. Thank you.</p>
				);
			}else if( tiles.length ){
				setContent(
					tiles.map((tile, i) => {
						if(tile.type === API_CHARACTERS__PATH.name){
							return <CharacterTile data={tile.data} key={i} />
						}else if(tile.type === API_LOCATIONS__PATH.name){
							return <LocationTile data= {tile.data} key={i} />
						}else if(tile.type === API_EPISODES__PATH.name){
							return <EpisodeTile data={tile.data} key={i} />
						}
						return null;
					})
				);
			}
		};

		action();
	}, []);

	return (
		<TileBoard>
			{content}
		</TileBoard>
	);
};
