'use client';
import { useState, useRef } from 'react';


import { API_CHARACTERS__PATH } from '@tsCF/data';

import {
	TileBoard_SearchValue,
	NonTilesResultsForDrawingSearchPageTileBoard,
	pushStateByLegacy
} from '@tsLF/pages';

import { initCharactersSearchPage	} from '@tsCF/pages';
  
import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getQPCBaseListFromURL	} from '@tsLF/forURLSP';

import type { GT } from '@tsC/api-graphql-to-ex';


import { useGlobalContext } from '@/components/context/globalContext';


import SearchItemNav from '@/components/next/routes/SearchItemNav';
import CharactersSearch from '@/components/next/routes/Characters/CharactersSearch';
import TileBoard from '@/components/next/tileBoard/TileBoard';
import CharacterTile from '@/components/next/tileBoard/tiles/CharacterTile';
import TileBoard_Search from '@/components/next/tileBoard_Search/TileBoard_Search';




const pathName = API_CHARACTERS__PATH.name;

export default function Characters(){


	// const pageTitle = capitalizeWord(API_CHARACTERS__PATH.name);
	// const	pathName = data.psl.route.id.slice(1);


	// let CharactersSearch__exit_values: QueryParamCompatible_Base[] = [];
	// let pagination__exit_value: number | undefined;


	// let CharactersSearch__update_values: QueryParamCompatible_Base[] = getQPCBaseListFromURL(new URL(data.psl.url));
	// let TileBoard_SearchUpdateValue: TileBoard_SearchValue | undefined;
	// let tiles: GT.CharacterPreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


	// const set_CharactersSearch__update_values = (v: QueryParamCompatible_Base[]) => (CharactersSearch__update_values = v);
	// const set_TileBoard_SearchValue = (v: TileBoard_SearchValue) => (TileBoard_SearchUpdateValue = v);
	// const set_tiles = (v: GT.CharacterPreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard) => (tiles = v);





	// const {
	// 	handlePaginationSelection,
	// 	handleCharactersSearchApply,
	// 	actionExecuterAfterMount,
	// 	searchPageManager
	// } = initCharactersSearchPage(
	// 	{
	// 		pathName,
	// 		pushStateFn: pushState,
	// 		set_tiles,
	// 		set_TileBoard_SearchValue,
	// 		set_CharactersSearch__update_values,
	// 		wUrql,
	// 		wLocationChangeEventEmitter
	// 	}
	// );


	// $:{
	// 	tiles = tiles;
	// }
	// $:{
	// 	handleCharactersSearchApply(CharactersSearch__exit_values);
	// }
	// $:{
	// 	handlePaginationSelection(pagination__exit_value);
	// }


	// onMount(
	// 	() => {
	// 		actionExecuterAfterMount.setReady();
			
	// 		searchPageManager.init(CharactersSearch__update_values);
	// 	}
	// );


	const { 
		wUrql,
		wLocationChangeEventEmitter
	} = useGlobalContext();
	const [
		CharactersSearch__update_values,
		set_CharactersSearch__update_values
	] = useState<QueryParamCompatible_Base[]>([]); 
	const [
		TileBoard_SearchUpdateValue,
		set_TileBoard_SearchValue
	] = useState<TileBoard_SearchValue | undefined>(undefined);
	const [
		tiles,
		set_tiles
	] = useState<
		GT.CharacterPreviewFieldsFragment[]
		| NonTilesResultsForDrawingSearchPageTileBoard
	>('LOADING');
	const O = useRef(
		initCharactersSearchPage(									              // prosti menya, gospod'... no ya greshen...
			{                                                     //@ts-ignore
				pathName,																						//@ts-ignore
				pushStateFn: pushStateByLegacy,											//@ts-ignore
				set_tiles,																					//@ts-ignore
				set_TileBoard_SearchValue,													//@ts-ignore
				set_CharactersSearch__update_values,								//@ts-ignore
				wUrql,																							//@ts-ignore
				wLocationChangeEventEmitter
			}
		)
	);
	const {
		handlePaginationSelection,
		handleCharactersSearchApply,
		actionExecuterAfterMount,
		searchPageManager
	} = O.current;
	const get_CharactersSearch__exit_values = (v: QueryParamCompatible_Base[]) => {
		// prosti menya, gospod'... no ya greshen...
		//@ts-ignore
		handleCharactersSearchApply(v);
	}
	const get_pagination__exit_value = (v: number | undefined) => {
		// prosti menya, gospod'... no ya greshen...
		//@ts-ignore
		handlePaginationSelection(v);
	}
	

	// prosti menya, gospod'... no ya greshen...
	//@ts-ignore
	if(!actionExecuterAfterMount.isReady()){
		set_CharactersSearch__update_values(
			getQPCBaseListFromURL(
				new URL(window.location.href)
			)
		);
		
		// prosti menya, gospod'... no ya greshen...
		//@ts-ignore
		actionExecuterAfterMount.setReady();
		
		// prosti menya, gospod'... no ya greshen...
		//@ts-ignore
		searchPageManager.init(CharactersSearch__update_values);
	}



// <svelte:head>
// 	<title>{ pageTitle } • { APP_NAME }</title>
// 	<meta name="description" content="{ APP_NAME } { pageTitle }" />
// </svelte:head>

	return (
		<>
			<SearchItemNav pathName={pathName}>
				<CharactersSearch
					get_exit_values = {
						get_CharactersSearch__exit_values
					}
					init_cachedValues = {
						CharactersSearch__update_values
					}
					update_values = {
						CharactersSearch__update_values
					}
				/>
			</SearchItemNav>
		
			{
				(
					() => {
				
						if (tiles === 'ERR') {
							return (
								<TileBoard>
									<p>Network Error. Try later or kill yourself. Thank you.</p>
								</TileBoard>
							);
						} else if(tiles === 'LOADING') {
							return (
								<TileBoard>
									<p>Loading...</p>
								</TileBoard>
							);
						} else if (tiles === 'NOT FOUND'){
							return (
								<TileBoard>
									<p>Nothing found.</p>
								</TileBoard>
							);
						}else if (Array.isArray(tiles)){
							let tileComponents = [];

							for(let i = 0; i < tiles.length; i++){
								tileComponents.push(
									<CharacterTile data={tiles[i]} key={`${tiles[i].id} ${tiles[i].name}`} />
								);
							}

							if(!TileBoard_SearchUpdateValue){
								throw new Error('!TileBoard_SearchUpdateValue');
							}

							return (
								<TileBoard_Search
									update_value={
										TileBoard_SearchUpdateValue
									}
									getPagination__exit_value={
										get_pagination__exit_value
									}
								>
									{tileComponents}
								</TileBoard_Search>
							);
						}
			
					}
				)()
			}

			
			{/*#if tiles === 'ERR'}
				<TileBoard>
					<p>Network Error. Try later or kill yourself. Thank you.</p>
				</TileBoard>
			{:else if tiles === 'LOADING'}
				<TileBoard>
					<p>Loading...</p>
				</TileBoard>
			{:else if tiles === 'NOT FOUND'}
				<TileBoard>
					<p>Nothing found.</p>
				</TileBoard>
			{:else if Array.isArray(tiles)}
				<TileBoard_Search
					bind:update_value={
						TileBoard_SearchUpdateValue
					}
					bind:pagination__exit_value={
						pagination__exit_value
					}
				>
				{#each tiles as tile }
					<CharacterTile data={tile} />
				{/each}
				</TileBoard_Search>
			{/if*/}

		</>
	);
}
