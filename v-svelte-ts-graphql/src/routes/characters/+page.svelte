<script lang="ts">
	import { onMount } from 'svelte';


	import type { GT } from '@tsC/api-graphql-to-ex';

	import { API_CHARACTERS__PATH } from '@tsCF/data';

	import { capitalizeWord } from '@tsLF/pages';
	import type { ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';
	
	import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
	import { 
		getQPCBaseListFromURL
	} from '@tsLF/forURLSP';


	import { APP_NAME } from '$comps/data';
	import g from '$comps/context/index.ts';
	const wUrql = g().wUrql;


	import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';
	import CharactersSearch from '$comps/svelte/routes/Characters/CharactersSearch.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';




	export let data;


//dev
import {U} from '@tsL/utils';
	const initUrl = new URL(data.psl.url);

	const CharactersSearch__init_cachedValues: QueryParamCompatible_Base[] = getQPCBaseListFromURL(initUrl);

	console.log(
		'QPCBaseList',
		initUrl,
		CharactersSearch__init_cachedValues
	)


	let tiles: GT.CharacterPreviewFieldsFragment[] | ERR = [];

	$: _tiles = tiles;
	$:charSearchExit = undefined;
	$:{
		console.log(
			'page.svelte',

			data,
			
			charSearchExit,

		)
	}

	const pageTitle = capitalizeWord(API_CHARACTERS__PATH.name);
	const	pathName = data.psl.route.id.slice(1);

//dev
	import type { WT } from '@tsC/api-graphql-to-ex';

	class URLSearchParamsChangeObserver{
		#_interval: ReturnType<typeof setInterval>;

		constructor(
			{
				pathname
			} : {
				pathname: string;

			}
		){
			const T = this;

			T.#_interval = setInterval(
				() => {
					try{
						

						
					} catch (e){
						// stop me, if u can.

					}
				}
			);
			
		}

		attach(){

		}

		notify(){
		
		}

	}

	const test_URLSearchParamsChangeObserver = new URLSearchParamsChangeObserver(
		{
			pathname: '/characters'
		}
	)


//blya hochu zeleniy den...
	 const qpcBaseList: QueryParamCompatible_Base[] = [

	 /*
		{
			param: 'gender',
			value: 'm ale'
		},

		{
			param: 'gender',
			value: 'female'
		},
		{
			param: 'gender',
			value: '333male'
		},


		{
			param: 'type',
			value: 'Parasit'
		},

		{
			param: 'invalidType',
			value: 'Parasit'
		},
		{
			param: 'type',
			value: '11Parasit'
		},


		{
			param: 'species',
			value: 'ParasitSPe'
		},


		{
			param: 'episode',
			value: 'lol invalid'
		},
		{
			param: 'episode',
			value: 'S01'
		},
*/
	]; 
	



//dev

	onMount(async () => {
//		tiles = await getCharacterTiles(wUrql)

		
	});

</script>

<svelte:head>
	<title>{ pageTitle } • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME } { pageTitle }" />
</svelte:head>

<SearchItemNav {pathName}>
	<CharactersSearch
		bind:exit_values = {
			charSearchExit
		}
		init_cachedValues = {
			CharactersSearch__init_cachedValues
		}
	/>
</SearchItemNav>
<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}
		<p>RESULTS</p>
		<p>tiles</p>

		{#each _tiles as tile }
			<CharacterTile data={tile.data} />
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
