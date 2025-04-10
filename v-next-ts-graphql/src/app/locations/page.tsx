'use client';
import { useState, useEffect, useRef } from 'react';


import { API_LOCATIONS__PATH } from '@tsCF/data';

import type {
	TileBoard_SearchValue,
	NonTilesResultsForDrawingSearchPageTileBoard
} from '@tsLF/pages';

import { initLocationsSearchPage	} from '@tsCF/pages';
  
import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getQPCBaseListFromURL } from '@tsLF/forURLSP';

import type { GT } from '@tsC/api-graphql-to-ex';


import { useGlobalContext } from '@/components/context/globalContext';


import SearchItemNav from '@/components/next/routes/SearchItemNav';
import LocationsSearch from '@/components/next/routes/Locations/LocationsSearch';
import TileBoard from '@/components/next/tileBoard/TileBoard';
import LocationTile from '@/components/next/tileBoard/tiles/LocationTile';
import TileBoard_Search from '@/components/next/tileBoard_Search/TileBoard_Search';




const pathName = API_LOCATIONS__PATH.name;

//DELETE ME

	import {
		API_LOCATIONS__PARAM__NAME,
		API_LOCATIONS__PARAM__DIMENSION,
		API_LOCATIONS__PARAM__TYPE,
		API_LOCATIONS__PARAM_LIST,
		API_EPISODES__PARAM__EPISODE,
		API_EPISODES__PARAM__NAME
	} from '@tsCF/data';

import type { QPC_InputText } from '@tsLF/forURLSP';

import InputText from '@/components/next/customForm/InputText';
//DELETE ME


export default function Locations(
	{
		params,
		searchParams
	}:{
		searchParams: Promise<{ [key: string]: string | string[] | undefined }>
	}
){

	const { 
		wUrql,
		wLocationChangeEventEmitter
	} = useGlobalContext();
	const [
		LocationsSearch__update_values,
		set_LocationsSearch__update_values
	] = useState<QueryParamCompatible_Base[]>([]);
	const [
		TileBoard_SearchUpdateValue,
		set_TileBoard_SearchValue
	] = useState<TileBoard_SearchValue | undefined>(undefined);
	const [
		tiles,
		set_tiles
	] = useState<
		GT.LocationPreviewFieldsFragment[]
		| NonTilesResultsForDrawingSearchPageTileBoard
	>('LOADING');
	// const {
	// 	handlePaginationSelection,
	// 	handleLocationsSearchApply,
	// 	actionExecuterAfterMount,
	// 	searchPageManager
	// } = initLocationsSearchPage(
	// 	{
	// 		pathName,
	// 		pushStateFn: pushState,
	// 		set_tiles,
	// 		set_TileBoard_SearchValue,
	// 		set_LocationsSearch__update_values,
	// 		wUrql,
	// 		wLocationChangeEventEmitter
	// 	}
	// );

	const [entryValTest, setEn] = useState({param:'fff', value:'0 zero'})

	const didItExec = useRef(false);	
	useEffect(() => {
		const action = async ():Promise<void> => {
			if(didItExec.current){
				return;
			}

			didItExec.current = true;

			
			//actionExecuterAfterMount.setReady();
			
			//searchPageManager.init(LocationsSearch__update_values);

			// ??? nujno li teper???
			// set_LocationsSearch__update_values(
			// 	getQPCBaseListFromURL(new URL(window.location.href))
			// );


			// console.log(window.location.href)	
			// console.log(await params, await searchParams);
		





		};

		action();
	}, []);

const timerRef = useRef<NodeJS.Timeout>();
	
	useEffect(() => {

				if(timerRef.current){return}
				timerRef.current = setTimeout(
					()=>{console.log('setEn');setEn({param:'name', value:'pizda'})}
					, 2000
				)

			console.log('blyat, asdfa')
	}, [])


	function LocationsSearch__getExitValues(v: any) {
		console.log('LocationsSearch__getExitValues', v)
		
	}

	function InputText__get_exitValue(v: QPC_InputText) {
		console.log(InputText__get_exitValue.name, v)
		
	}


	return (
		<>
			<SearchItemNav pathName={pathName}>
				<LocationsSearch
					get_exitValue = {
						LocationsSearch__getExitValues
					}
					init_cachedValues = {
						LocationsSearch__update_values
					}
					update_values = {
						LocationsSearch__update_values
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
									<LocationTile data={tiles[i]} key={i} />
								);
							}

							return (
								<TileBoard_Search
									update_value={
										TileBoard_SearchUpdateValue
									}
									getPagination__exit_value={
										pagination__exit_value
									}
								>
									{tileComponents}
								</TileBoard_Search>
							);
						}
			
					}
				)()
			}

		</>	
	);
}







// import { pushState } from '$app/navigation';







// import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';
// import LocationsSearch from '$comps/svelte/routes/Locations/LocationsSearch.svelte';
// import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
// import LocationTile from '$comps/svelte/tileBoard/tiles/LocationTile.svelte';
// import TileBoard_Search from '$comps/svelte/tileBoard_Search/TileBoard_Search.svelte';




// export let data;




// let LocationsSearch__exit_values: QueryParamCompatible_Base[] = [];
// let pagination__exit_value: number | undefined;


// let LocationsSearch__update_values: QueryParamCompatible_Base[] = getQPCBaseListFromURL(new URL(data.psl.url));
// let TileBoard_SearchUpdateValue: TileBoard_SearchValue | undefined;
// let tiles: GT.LocationPreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


// const set_LocationsSearch__update_values = (v: QueryParamCompatible_Base[]) => (LocationsSearch__update_values = v);
// const set_TileBoard_SearchValue = (v: TileBoard_SearchValue) => (TileBoard_SearchUpdateValue = v);
// const set_tiles = (v: GT.LocationPreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard) => (tiles = v);





// const {
// 	handlePaginationSelection,
// 	handleLocationsSearchApply,
// 	actionExecuterAfterMount,
// 	searchPageManager
// } = initLocationsSearchPage(
// 	{
// 		pathName,
// 		pushStateFn: pushState,
// 		set_tiles,
// 		set_TileBoard_SearchValue,
// 		set_LocationsSearch__update_values,
// 		wUrql,
// 		wLocationChangeEventEmitter
// 	}
// );


// $:{
// 	tiles = tiles;
// } 
// $:{
// 	handleLocationsSearchApply(LocationsSearch__exit_values);
// } 
// $:{
// 	handlePaginationSelection(pagination__exit_value);
// } 


// onMount(
// 	() => {
// 		actionExecuterAfterMount.setReady();
		
// 		searchPageManager.init(LocationsSearch__update_values);
// 	}
// );




// <SearchItemNav {pathName}>
// 	<LocationsSearch
// 		bind:exit_values = {
// 			LocationsSearch__exit_values
// 		}
// 		init_cachedValues = {
// 			LocationsSearch__update_values
// 		}
// 		bind:update_values = {
// 			LocationsSearch__update_values
// 		}
// 	/>
// </SearchItemNav>


// {#if tiles === 'ERR'}
// 	<TileBoard>
// 		<p>Network Error. Try later or kill yourself. Thank you.</p>
// 	</TileBoard>
// {:else if tiles === 'LOADING'}
// 	<TileBoard>
// 		<p>Loading...</p>
// 	</TileBoard>
// {:else if tiles === 'NOT FOUND'}
// 	<TileBoard>
// 		<p>Nothing found.</p>
// 	</TileBoard>
// {:else if Array.isArray(tiles)}
// 	<TileBoard_Search
// 		bind:update_value={
// 			TileBoard_SearchUpdateValue
// 		}
// 		bind:pagination__exit_value={
// 			pagination__exit_value
// 		}
// 	>
// 	{#each tiles as tile }
// 		<LocationTile data={tile} />
// 	{/each}
// 	</TileBoard_Search>
// {/if}
