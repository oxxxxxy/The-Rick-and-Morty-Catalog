<script lang="ts">
	
	import type { GT } from '@tsC/api-graphql-to-ex';

	import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';

	import { initEpisodeIdPage } from '@tsCF/pages';


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
	}


	initEpisodeIdPage(
		{
			wUrql,
			set_pageTitle,
			set_bigTile,
			episode_id: data.psl.params.id
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
