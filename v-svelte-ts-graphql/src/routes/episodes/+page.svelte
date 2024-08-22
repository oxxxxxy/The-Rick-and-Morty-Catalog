<script lang="ts">
	import { onMount } from 'svelte';

	import { pushState } from '$app/navigation';


	import { API_EPISODES__PATH } from '@tsCF/data';

	import { capitalizeWord } from '@tsLF/pages';
	import type {
		TileBoard_SearchValue,
		NonTilesResultsForDrawingSearchPageTileBoard
	} from '@tsLF/pages';

	import { initEpisodesSearchPage	} from '@tsCF/pages';
	
	import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
	import { getQPCBaseListFromURL	} from '@tsLF/forURLSP';

	import type { GT } from '@tsC/api-graphql-to-ex';


	import { APP_NAME } from '$comps/data';
	import g from '$comps/context/index.ts';
	const { 
		wUrql,
		wLocationChangeEventEmitter
	} = g();


	import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';
	import EpisodesSearch from '$comps/svelte/routes/Episodes/EpisodesSearch.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
	import EpisodeTile from '$comps/svelte/tileBoard/tiles/EpisodeTile.svelte';
	import TileBoard_Search from '$comps/svelte/tileBoard_Search/TileBoard_Search.svelte';




	export let data;


	const pageTitle = capitalizeWord(API_EPISODES__PATH.name);
	const	pathName = data.psl.route.id.slice(1);


	let EpisodesSearch__exit_values: QueryParamCompatible_Base[] = [];
	let pagination__exit_value: number | undefined;


	let EpisodesSearch__update_values: QueryParamCompatible_Base[] = getQPCBaseListFromURL(new URL(data.psl.url));
	let TileBoard_SearchUpdateValue: TileBoard_SearchValue | undefined;
	let tiles: GT.EpisodePreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


	const set_EpisodesSearch__update_values = (v: QueryParamCompatible_Base[]) => (EpisodesSearch__update_values = v);
	const set_TileBoard_SearchValue = (v: TileBoard_SearchValue) => (TileBoard_SearchUpdateValue = v);
	const set_tiles = (v: GT.EpisodePreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard) => (tiles = v);





	const {
		handlePaginationSelection,
		handleEpisodesSearchApply,
		actionExecuterAfterMount,
		searchPageManager
	} = initEpisodesSearchPage(
		{
			pathName,
			pushStateFn: pushState,
			set_tiles,
			set_TileBoard_SearchValue,
			set_EpisodesSearch__update_values,
			wUrql,
			wLocationChangeEventEmitter
		}
	);


	$:{
		tiles = tiles;
	}
	$:{
		handleEpisodesSearchApply(EpisodesSearch__exit_values);
	}
	$:{
		handlePaginationSelection(pagination__exit_value);
	}


	onMount(
		() => {
			actionExecuterAfterMount.setReady();
			
			searchPageManager.init(EpisodesSearch__update_values);
		}
	);

</script>




<svelte:head>
	<title>{ pageTitle } • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME } { pageTitle }" />
</svelte:head>


<SearchItemNav {pathName}>
	<EpisodesSearch
		bind:exit_values = {
			EpisodesSearch__exit_values
		}
		init_cachedValues = {
			EpisodesSearch__update_values
		}
		bind:update_values = {
			EpisodesSearch__update_values
		}
	/>
</SearchItemNav>


{#if tiles === 'ERR'}
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
		<EpisodeTile data={tile} />
	{/each}
	</TileBoard_Search>
{/if}
