import type { GT } from '@tsC/api-graphql-to-ex';

import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';

import { initLocationIdPage } from '@tsCF/pages';


import { APP_NAME } from '@/components/data';

import BigLocationTile from '@/components/next/routes/Locations-id/BigLocationTile';
import TileBoard from '@/components/next/tileBoard/TileBoard';




	// export let data;


	let pageTitle = 'Location loading';
	let bigTile: GT.LocationFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


	const set_bigTile = (v: GT.LocationFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard) => (bigTile = v);
	const set_pageTitle = (v: string) => (pageTitle = v);


	// $:{
	// 	pageTitle = pageTitle;
	// }
	// $:{
	// 	bigTile = bigTile;
	// }


	initLocationIdPage(
		{
			wUrql,
			set_pageTitle,
			set_bigTile,
			location_id: data.psl.params.id
		}
	);




// <svelte:head>
// 	<title>{ pageTitle } • { APP_NAME }</title>
// 	<meta name="description" content="{ APP_NAME } { pageTitle }" />
// </svelte:head>

export default function Locations_Id(){

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
