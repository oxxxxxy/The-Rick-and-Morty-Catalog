'use client';
import { useState, useEffect, useRef } from 'react';


import { Metadata } from 'next';


import { API_LOCATIONS__PATH } from '@tsCF/data';

import { capitalizeWord } from '@tsLF/pages';
import type {
	TileBoard_SearchValue,
	NonTilesResultsForDrawingSearchPageTileBoard
} from '@tsLF/pages';

import { initLocationsSearchPage	} from '@tsCF/pages';
  
import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getQPCBaseListFromURL	} from '@tsLF/forURLSP';

import type { GT } from '@tsC/api-graphql-to-ex';


import { APP_NAME } from '@/components/data';
import { useGlobalContext } from '@/components/context/globalContext';


import SearchItemNav from '@/components/next/routes/SearchItemNav';
import TileBoard from '@/components/next/tileBoard/TileBoard';
// import TileBoard_Search from '@/components/next/tileBoard_Search/TileBoard_Search';
// import LocationsSearch from '@/components/next/routes/Locations/LocationsSearch';
import LocationTile from '@/components/next/tileBoard/tiles/LocationTile';




// export const metadata: Metadata = {
//   title: "Locations • " + APP_NAME,
//   description: APP_NAME,

// };

export default function Locations(
	{
		params,
		searchParams
	}
){

	useEffect(() => {
		async function action(){
	console.log(await params, await searchParams);
			
		};

		action();
	});

const { 
	wUrql,
	wLocationChangeEventEmitter
} = useGlobalContext();

	return (
		<p>chlen</p>	
	);
}






// import { onMount } from 'svelte';

// import { pushState } from '$app/navigation';


// import { API_LOCATIONS__PATH } from '@tsCF/data';

// import { capitalizeWord } from '@tsLF/pages';
// import type {
// 	TileBoard_SearchValue,
// 	NonTilesResultsForDrawingSearchPageTileBoard
// } from '@tsLF/pages';

// import { initLocationsSearchPage	} from '@tsCF/pages';
  
// import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
// import { getQPCBaseListFromURL	} from '@tsLF/forURLSP';

// import type { GT } from '@tsC/api-graphql-to-ex';


// import { APP_NAME } from '$comps/data';
// import g from '$comps/context/index.ts';
// const { 
// 	wUrql,
// 	wLocationChangeEventEmitter
// } = g();


// import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';
// import LocationsSearch from '$comps/svelte/routes/Locations/LocationsSearch.svelte';
// import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
// import LocationTile from '$comps/svelte/tileBoard/tiles/LocationTile.svelte';
// import TileBoard_Search from '$comps/svelte/tileBoard_Search/TileBoard_Search.svelte';




// export let data;


// const pageTitle = capitalizeWord(API_LOCATIONS__PATH.name);
// const	pathName = data.psl.route.id.slice(1);


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




// <svelte:head>
// 	<title>{ pageTitle } • { APP_NAME }</title>
// 	<meta name="description" content="{ APP_NAME } { pageTitle }" />
// </svelte:head>

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
