<script lang="ts">
	import { onMount } from 'svelte';
	

	import type { TileItems, ERR } from '@tsCF/pages/src/routes/Home/NineRandomTiles.ts';
	import { randomTileWraps, getSomeRandomTiles } from '@tsCF/pages/src/routes/Home/NineRandomTiles.ts';


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
		console.log(tiles);
	});

</script>

<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}
		{#each _tiles as tile }
			{#if tile.type === 'characters'}
				<p>chars</p>
			{:else if tile.type === 'locations'}
				<p>locals</p>
			{:else if tile.type === 'episodes'}
				<p>episode</p>
			{/if}
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
