<script lang="ts">
	import { onMount } from 'svelte';
	

	import type { TileItems, ERR } from '@tsCF/pages/src/routes/Home/NineRandomTiles.ts';
	import { randomTileWraps, getSomeRandomTiles } from '@tsCF/pages/src/routes/Home/NineRandomTiles.ts';
	import { 
		API_CHARACTERS__PATH,
		API_EPISODES__PATH,
		API_LOCATIONS__PATH
	} from '@tsCF/data';

	import g from '$comps/context/index.ts';
	const wUrql = g().wUrql;


	import TileBoard from '$comps/tileBoard/TileBoard.svelte';
	import CharacterTile from '$comps/tileBoard/tiles/CharacterTile.svelte';
	import EpisodeTile from '$comps/tileBoard/tiles/EpisodeTile.svelte';
	import LocationTile from '$comps/tileBoard/tiles/LocationTile.svelte';




	let tiles: TileItems | ERR = [];

	$: _tiles = ((): TileItems => tiles )();


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
