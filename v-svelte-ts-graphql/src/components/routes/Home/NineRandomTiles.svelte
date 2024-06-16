<script lang="ts">
	import type { PositiveInteger } from '@tsL/types';

	import { wUrql } from '$comps/context/getContext.ts';
	
	import TileBoard from '$comps/tileBoard/TileBoard.svelte';
	import CharacterTile from '$comps/tileBoard/tiles/CharacterTile.svelte';
	import EpisodeTile from '$comps/tileBoard/tiles/EpisodeTile.svelte';
	import LocationTile from '$comps/tileBoard/tiles/LocationTile.svelte';



	$:tiles = [];

	const getRandomChooseOfVariantsForEach = <N1 extends number, N2 extends number> (
		variantCount: PositiveInteger<N1>,
		eachCount: PositiveInteger<N2>
	): number[] => 
		[...Array(eachCount).keys()].map(
			e => Math.round((variantCount - 1) * Math.random()) + 1
		);


	const makeNineTiles = async ():Promise<void> => {
		const variants = [
			'characters',
			'episodes',
			'locations'
		];
	
		const tileCount = 9;
		const variatCountOfCharactersLocationsEpisodes = variants.length;
	
		const choosenVariantsForEachTile = getRandomChooseOfVariantsForEach(
			variatCountOfCharactersLocationsEpisodes,
			tileCount
		);

		const charRes = await wUrql().q.GetCharactersInfo();
		const charactersVariants = choosenVariantsForEachTile.filter(e => e === 1);
		const randomChoosenIds = getRandomChooseOfVariantsForEach(charRes.data.count, charactersVariants.length);

		const { data } = await wUrql().q.GetCharactersByIds({ids: randomChoosenIds});

		data.charactersByIds;

	
	
	
	}

	//makeNineTiles();

	async function a(){
		console.log(
			await wUrql().q.GetCharactersByIds({ids: [1,2,3]})
		)
	}a()
</script>

<TileBoard>
	{#if tiles.length}
		<p>tiles</p>
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
