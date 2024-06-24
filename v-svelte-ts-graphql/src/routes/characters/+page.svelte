<script lang="ts">
	import { onMount } from 'svelte';


	import type { GT } from '@tsC/api-graphql-to-ex';

	import { API_CHARACTERS__PATH } from '@tsCF/data';

	import { capitalizeWord } from '@tsLF/pages';
	import type { ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';


	import { APP_NAME } from '$comps/data';
	import g from '$comps/context/index.ts';
	const wUrql = g().wUrql;


	import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';
	import CharactersSearch from '$comps/svelte/routes/Characters/CharactersSearch.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';




	export let data;


	let tiles: GT.CharacterPreviewFieldsFragment[] | ERR = [];

	$: _tiles = tiles;


	const pageTitle = capitalizeWord(API_CHARACTERS__PATH.name);
	const	pathName = data.psl.route.id.slice(1);

//dev
	import type { WT } from '@tsC/api-graphql-to-ex';

	



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
	<CharactersSearch />
</SearchItemNav>
<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}
		<p>tiles</p>
		{#each _tiles as tile }
			<CharacterTile data={tile.data} />
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
