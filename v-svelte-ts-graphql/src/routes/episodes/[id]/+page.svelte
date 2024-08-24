<script lang="ts">


	import { U } from '@tsL/utils';
	
	import type { GT } from '@tsC/api-graphql-to-ex';

	import type {
		PositiveInteger,
		ObjectWithStringValues
	} from '@tsL/types';

	import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';


	import { APP_NAME } from '$comps/data';
	import g from '$comps/context/index.ts';
	const { 
		wUrql
	} = g();


	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';
	import BigEpisodeTile from '$comps/svelte/routes/Episodes-id/BigEpisodeTile.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';




	export let data;


	let pageTitle = 'Episode loading'; // Episode S11E01     * TRAMC
	let bigTile: NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


	const set_bigTile = (v) => (bigTile = v);
	const set_pageTitle = (v) => (pageTitle = v);

console.log(data);

	$:{
		pageTitle = pageTitle;
	}
	$:{
		bigTile = bigTile;
	}


async function fna(){
	U.log(
		// await wUrql.q.GetCharacter({id:'2'}),
		await wUrql.q.GetEpisode({id: '1'}),
		// await wUrql.q.GetLocation({id: '2'}),
		
			)
}

fna()


	const pageTitleValues = 

	{
		cause: 'not found',
		value: 'Nothing found'
	};

	type ArgumentsFor_LittleChangeableStringElementDrawer = {
		setElementValueFn: (v: string) => void;
		elementCauseValues: {
				cause: string,
				value: string | ((v: any) => string)
			}[];
	}
	
	class LittleChangeableStringElementDrawer{
		valueList;

		constructor(
			{
			
			}
		)

	}




	const id = data.psl.params.id;

	if(!Array.isArray(id.match(/^([1-9]|[1-9][0-9]+)$/))){
		// NOT FOUND SRAZU NAHUY VEZDE
	}







/*

	type ArgumentsFor_ItemPageDrawer = {
		set_bigTile: (v: Object | NonTilesResultsForDrawingSearchPageTileBoard) => void;
		set_pageTitle: (v: string) => void;
		itemId: PositiveInteger<number>;
		
	}

	class ItemPageDrawer {
		// #pageTitleMessages: ObjectWithStringValues;

		constructor(
			{
			} : ArgumentsFor_ItemPageDrawer
		){

		}

		drawNotFound(){
			this.#setExternalBigTile('NOT FOUND');
			// this.#setExternalPageTitle(this.#pageTitleMessages.notFound);
		}

		drawError(){

		}
	} */












</script>




<svelte:head>
	<title>{ pageTitle } • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME } { pageTitle }" />
</svelte:head>


{#if bigTile === 'ERR'}
	<TileBoard>
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	</TileBoard>
{:else if bigTile === 'LOADING'}
	<TileBoard>
		<p>Loading...</p>
	</TileBoard>
{:else if bigTile === 'NOT FOUND'}
	<TileBoard>
		<p>Nothing found.</p>
	</TileBoard>
{:else if typeof bigTile === 'object'}
	<TileBoard>
		<p>bigTile was found.</p>
	</TileBoard>
{/if}

