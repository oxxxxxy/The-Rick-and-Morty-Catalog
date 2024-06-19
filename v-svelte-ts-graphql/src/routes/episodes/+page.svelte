<script lang="ts">
	import { API_EPISODES__PATH } from '@tsCF/data';
	
	import { capitalizeWord } from '@tsCF/pages/src/index.ts';
	import type { TileItems, ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';


	import { APP_NAME } from '$comps/data';


	import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
	import EpisodeTile from '$comps/svelte/tileBoard/tiles/EpisodeTile.svelte';



	export let data;


	let tiles: TileItems | ERR = [];

	$: _tiles = tiles;


	const pageTitle = capitalizeWord(API_EPISODES__PATH.name);
	const	pathName = data.psl.route.id.slice(1);

</script>

<svelte:head>
	<title>{ pageTitle } • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME } { pageTitle }" />
</svelte:head>

<SearchItemNav {pathName}/>
<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}
		<p>tiles</p>
		{#each _tiles as tile }
			<EpisodeTile data={tile.data} />
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
