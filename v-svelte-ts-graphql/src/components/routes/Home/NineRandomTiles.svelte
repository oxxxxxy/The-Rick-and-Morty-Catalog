<script lang="ts">
	import type { PositiveInteger } from '@tsL/types';

	const getRandomChooseOfVariantsForEach = <N1 extends number, N2 extends number> (
		variantCount: PositiveInteger<N1>,
		eachCount: PositiveInteger<N2>
	): number[] => 
		[...Array(eachCount).keys()].map(
			e => Math.round((variantCount - 1) * Math.random()) + 1
		);


	const tileCount = 9;
	const variatCountOfCharactersLocationsEpisodes = 3;

	const choosenVariantsForEachTile = getRandomChooseOfVariantsForEach(
		variatCountOfCharactersLocationsEpisodes,
		tileCount
	);



</script>
