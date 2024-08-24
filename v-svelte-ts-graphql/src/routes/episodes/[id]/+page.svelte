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
		await wUrql.q.GetEpisode({id: '3'}),
		// await wUrql.q.GetLocation({id: '2'}),
		
			)
}

fna()




	type ElementCauseValueObj = {
		cause: string;
		value: string | ((v: any) => string);
	};

	type ArgumentsFor_LittleChangeableStringElementDrawer = {
		setElementValueFn: (v: string) => void;
		elementCauseValues: ElementCauseValueObj[];
	};
	
	class LittleChangeableStringElementDrawer{
		readonly elementCauseValues: ElementCauseValueObj[];
		#setExternalElementValue: (v:string) => void;

		constructor(
			{
				setElementValueFn,
				elementCauseValues
			} : ArgumentsFor_LittleChangeableStringElementDrawer
		){
			this.elementCauseValues = elementCauseValues;
			this.#setExternalElementValue = setElementValueFn;
		}

		draw(cause: string, v?: any){
			const found = this.elementCauseValues.find(e => e.cause === cause);

			if(!found){
				throw new Error('Nothing found by cause: ' + cause);
			}

			let value;

			if(typeof found.value === 'function'){
				value = found.value(v);
			} else {
				value = found.value;
			}

			this.#setExternalElementValue(value);
		}

	}

	const pageTitleDrawer = new LittleChangeableStringElementDrawer(
		{
			setElementValueFn: set_pageTitle,
			elementCauseValues: [
				// da ya huy ego znaet,
				// tut v lyubom sluchae sostoyanie kakoe-to, a mne uje ochen' len' bolee detal'no razobrat'sya v primerah podobnojo,
				// ya prosto hochu na minimalku uje vityanut' proekt.
				// doljno je bit' v nem chto-to horoschee, poetomu zdes' ya pozvolyu sebe detal'no ne produmivat', potomu chto razvitiya tut ne budet, izvinite.
				{
					cause: 'not found',
					value: 'Episode was not found'
				},
				{
					cause: 'error',
					value: 'Error'
				},
				{
					cause: 'ok',
					value: (notation: string) => 'Episode ' + notation
				},
				{
					cause: 'loading',
					value: 'Episode loading'
				}
			]
		}
	);



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


<TileBoard>
{#if bigTile === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
{:else if bigTile === 'LOADING'}
		<p>Loading...</p>
{:else if bigTile === 'NOT FOUND'}
		<p>Nothing found.</p>
{:else if typeof bigTile === 'object'}
		<p>bigTile was found.</p>
{/if}
</TileBoard>

