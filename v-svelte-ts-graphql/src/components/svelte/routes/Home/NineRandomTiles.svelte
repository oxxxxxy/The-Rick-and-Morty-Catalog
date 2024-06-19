<script lang="ts">
	import { onMount } from 'svelte';
	

	import type { TileItems, ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';
	import { randomTileWraps, getSomeRandomTiles } from '@tsCF/pages/src/routes/Home/NineRandomTiles.ts';

	import { 
		API_CHARACTERS__PATH,
		API_EPISODES__PATH,
		API_LOCATIONS__PATH
	} from '@tsCF/data';


	import g from '$comps/context/index.ts';
	const wUrql = g().wUrql;


	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';
	import EpisodeTile from '$comps/svelte/tileBoard/tiles/EpisodeTile.svelte';
	import LocationTile from '$comps/svelte/tileBoard/tiles/LocationTile.svelte';




	let tiles: TileItems | ERR = [];

	$: _tiles = tiles;


	onMount(async () => {
		tiles = await getSomeRandomTiles( wUrql, randomTileWraps );
	});

</script>

<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}
		{#each _tiles as tile }
			{#if tile.type === API_CHARACTERS__PATH.name}
				<CharacterTile data={tile.data} />
			{:else if tile.type === API_LOCATIONS__PATH.name}
				<LocationTile data= {tile.data} />
			{:else if tile.type === API_EPISODES__PATH.name}
				<EpisodeTile data={tile.data} />
			{/if}
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
