'use client';
import { useState, useEffect } from 'react';
  

import type { TileItems, ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';
import { randomTileWraps, getSomeRandomTiles } from '@tsCF/pages/src/routes/Home/NineRandomTiles.ts';

import { 
	API_CHARACTERS__PATH,
	API_EPISODES__PATH,
	API_LOCATIONS__PATH
} from '@tsCF/data';


import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';
import EpisodeTile from '$comps/svelte/tileBoard/tiles/EpisodeTile.svelte';
import LocationTile from '$comps/svelte/tileBoard/tiles/LocationTile.svelte';

import { useGlobalContext } from '@/components/context/globalContext';




export default function NineRandomTiles() {
	const [ tiles, setTiles ] = useState<TileItems | ERR>([]);	
	const { wUrql } = useGlobalContext();
		
	useEffect(() => {
		const action = async ():Promise<void> => {
			setTiles(
				await getSomeRandomTiles(wUrql, randomTileWraps)
			);	
		};

		action();
	});

	let content;
	if(tiles === 'ERR'){
		content = <p>Network Error. Try later or kill yourself. Thank you.</p>;
	}else if( tiles.length ){
		content = tiles.map((tile) => {
			if(tile.type === API_CHARACTERS__PATH.name){
				return <CharacterTile data={tile.data} />
			}else if(tile.type === API_LOCATIONS__PATH.name){
				return <LocationTile data= {tile.data} />
			}else if(tile.type === API_EPISODES__PATH.name){
				return <EpisodeTile data={tile.data} />
			}
		});
		// for(let tile of tiles){
		// 	if(tile.type === API_CHARACTERS__PATH.name){
		// 		content = <CharacterTile data={tile.data} />
		// 	}else if(tile.type === API_LOCATIONS__PATH.name){
		// 		content = <LocationTile data= {tile.data} />
		// 	}else if(tile.type === API_EPISODES__PATH.name){
		// 		content = <EpisodeTile data={tile.data} />
		// 	}
		// }
	}else{
		content = <p>Loading...</p>
	}

	return (
		<TileBoard>
			{content}
		{/*
			{#if _tiles === 'ERR'}
				<p>Network Error. Try later or kill yourself. Thank you.</p>
			{:else if _tiles.length}
				{#each _tiles as tile }
					{#if tile.type === API_CHARACTERS__PATH.name}
						<CharacterTile data={tile.data} />
					{:else if tile.type === API_LOCATIONS__PATH.name}
						<LocationTile data= {tile.data} />
					{:else if tile.type === API_EPISODES__PATH.name}
						<EpisodeTile data={tile.data} />
					{/if}
				{/each}
			{:else}
				<p>Loading...</p>
			{/if}
			*/}
		</TileBoard>
	);
};
