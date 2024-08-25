<script lang="ts">


	import { U } from '@tsL/utils';
	
	import type { GT } from '@tsC/api-graphql-to-ex';

	import type {
		PositiveInteger,
	} from '@tsL/types';

	import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';


	import { APP_NAME } from '$comps/data';
	import g from '$comps/context/index.ts';
	const { 
		wUrql
	} = g();


	import BigEpisodeTile from '$comps/svelte/routes/Episodes-id/BigEpisodeTile.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';




	export let data;


	let pageTitle = 'Episode loading';
	let bigTile: GT.EpisodeFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


	const set_bigTile = (v: GT.EpisodeFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard) => (bigTile = v);
	const set_pageTitle = (v: string) => (pageTitle = v);


	$:{
		pageTitle = pageTitle;
	}
	$:{
		bigTile = bigTile;
		U.log('bigTile', bigTile)
	}





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


	type ArgumentsFor_ItemPageManager = {
		set_bigTile: (v: Object | NonTilesResultsForDrawingSearchPageTileBoard) => void;
		pageTitleDrawer: LittleChangeableStringElementDrawer
		itemId: `${number}`;
		
	}

	class ItemPageManager {
		#pageTitleDrawer: LittleChangeableStringElementDrawer;
		#setExternalBigTile: (v: Object | NonTilesResultsForDrawingSearchPageTileBoard) => void;


		constructor(
			{
				set_bigTile,
				pageTitleDrawer,
				itemId
			} : ArgumentsFor_ItemPageManager
		){
			this.#pageTitleDrawer = pageTitleDrawer;
			this.#setExternalBigTile = set_bigTile;

			if(!Array.isArray(itemId.match(/^([1-9]|[1-9][0-9]+)$/))){
				this.drawNotFound();
			}

			this.drawLoading();
			this.makeReq(itemId);
		}


		drawNotFound(){
			this.#setExternalBigTile('NOT FOUND');
			this.#pageTitleDrawer.draw('not found');
		}

		drawError(){
			this.#setExternalBigTile('ERR');
			this.#pageTitleDrawer.draw('error');
		}
		
		drawLoading(){
			this.#setExternalBigTile('LOADING');
			this.#pageTitleDrawer.draw('loading');
		}

		async makeReq(id){
			let { data, error } = await wUrql.q.GetEpisode({id});

			data = data.episode;

			if(error){
				this.drawError();
				return;
			}

			if(!data){
				this.drawNotFound();
				return;
			}
			
			this.#setExternalBigTile(data);
			this.#pageTitleDrawer.draw('ok', data.episode);
			
			U.log(data, error)

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
				// ya prosto hochu na rabotu, boje, suka, dayte vibrat'sa iz gavna etogo, eto prosto pizdec
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

console.log(data);

async function fna(){
	const ep = await wUrql.q.GetEpisode({id: '3'});

	set_bigTile(ep.data.episode);

	U.log(
		
		// await wUrql.q.GetCharacter({id:'2'}),
		await wUrql.q.GetEpisode({id: '3'}),
		// await wUrql.q.GetLocation({id: '2'}),
		
			)
}

//fna()

	const asdf = new ItemPageManager(
		{
			set_bigTile,
			pageTitleDrawer,
			itemId: data.psl.params.id
		}
	);














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
	<BigEpisodeTile
		data={bigTile}
	/>
{/if}
</TileBoard>

