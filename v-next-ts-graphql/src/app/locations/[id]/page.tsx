'use client'
import { useState, useRef } from 'react';


import type { GT } from '@tsC/api-graphql-to-ex';

import type { 
	NonTilesResultsForDrawingSearchPageTileBoard,
	ItemPageManager
} from '@tsLF/pages';
import { capitalizeWord } from '@tsLF/pages';

import { initLocationIdPage_V2 } from '@tsCF/pages';

import { API_LOCATIONS__PATH } from '@tsCF/data';


import { useGlobalContext } from '@/components/context/globalContext';
import { APP_NAME } from '@/components/data';

import BigLocationTile from '@/components/next/routes/Locations-id/BigLocationTile';
import TileBoard from '@/components/next/tileBoard/TileBoard';




	// export let data;


	// let pageTitle = 'Location loading';
	// let bigTile: GT.LocationFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


	// const set_bigTile = (v: GT.LocationFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard) => (bigTile = v);
	// const set_pageTitle = (v: string) => (pageTitle = v);


	// $:{
	// 	pageTitle = pageTitle;
	// }
	// $:{
	// 	bigTile = bigTile;
	// }






// <svelte:head>
// 	<title>{ pageTitle } • { APP_NAME }</title>
// 	<meta name="description" content="{ APP_NAME } { pageTitle }" />
// </svelte:head>

export default async function Locations_Id(
	{
		params
	}:{
		params: Promise<{ id: string }>
	}
){

	const { id } = await params;
	const { wUrql } = useGlobalContext();
	const [pageTitle, set_pageTitle] = useState<string>('');
	const [bigTile, set_bigTile] = useState<GT.LocationFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard>('LOADING');
	const REF_itemPageManager = useRef<ItemPageManager>();





	if(!REF_itemPageManager.current){
		REF_itemPageManager.current = initLocationIdPage_V2(
			{
				wUrql,
				set_pageTitle,
				set_bigTile,
				location_id: id,
				APP_NAME
			}
		);

	}


	// const wordInPluralForm = capitalizeWord(API_LOCATIONS__PATH.name);
	// const TRAMCThemeObject = wordInPluralForm.slice(0, wordInPluralForm.length - 1);
	// const pageTitle = `${TRAMCThemeObject} Id${id} loading`;

	// const set_pageTitle = (v: string) => {
		
	// };


	
	// const wordInPluralForm = capitalizeWord(API_LOCATIONS__PATH.name);
	// const TRAMCThemeObject = wordInPluralForm.slice(0, wordInPluralForm.length - 1);
	// const pageTitle = `${TRAMCThemeObject}: ${LocationName}`;

	// document.title = `${ pageTitle } • ${ APP_NAME }`;
	// document.querySelector('meta[name="description"]').content = `${ APP_NAME } • ${ pageTitle }`;
	// zagruzit li on prediduschee sostoyanie???


	return (
		<TileBoard>
		{
			(
				() => {
					if (bigTile === 'ERR'){
						return <p>Network Error. Try later or kill yourself. Thank you.</p>
					}else if (bigTile === 'LOADING'){
						return <p>Loading...</p>
					}else if (bigTile === 'NOT FOUND'){
						return <p>Nothing found.</p>
					}else if (typeof bigTile === 'object'){
						return <BigLocationTile
							data={bigTile}
						/>
					}
				}
			)()
		}
		</TileBoard>
	);
}
