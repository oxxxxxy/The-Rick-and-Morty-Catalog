<script lang="ts">
	import type { PositiveInteger } from '@tsL/types';
	import type { ApiPathCompatible } from '@tsLF/types';
	import {
		API_LOCATIONS__PATH,
		API_EPISODES__PATH,
		API_CHARACTERS__PATH
	} from '@tsCF/data';
	import type { GT, UT, IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';


	import g from '$comps/context/index.ts';
	const wUrql = g().wUrql;


	import TileBoard from '$comps/tileBoard/TileBoard.svelte';
	import CharacterTile from '$comps/tileBoard/tiles/CharacterTile.svelte';
	import EpisodeTile from '$comps/tileBoard/tiles/EpisodeTile.svelte';
	import LocationTile from '$comps/tileBoard/tiles/LocationTile.svelte';




	type TileItem_Character = {
		type: 'character';
		data: GT.CharacterPreviewFieldsFragment;
	}
	type TileItem_Location = {
		type: 'location';
		data: GT.LocationPreviewFieldsFragment;
	}
	type TileItem_Episode = {
		type: 'episode';
		data: GT.EpisodePreviewFieldsFragment;
	}

	type TileItem = TileItem_Character | TileItem_Episode | TileItem_Location;

	type ERR = 'ERR';

	type TileItems = TileItem[] | ERR;

	type DataInternalProp = 'characters' | 'locations' | 'episodes';



	let tiles: TileItems = [];

	$: _tiles = ((): TileItems => tiles )();



	const getRandomChooseOfVariantsForEach = (
		variantCount: PositiveInteger<number>,
		eachCount: PositiveInteger<number>
	): number[] => 
		[...Array(eachCount).keys()].map(
			e => Math.round((variantCount - 1) * Math.random()) + 1
		);


	//random character tiles
	const randomCharacterTiles = async (
		tileCount: PositiveInteger<number>,
		wUrql: IUrqlClientWrapper
	): Promise<ERR | TileItem_Character[]> => {
		const infoResponse = await wUrql.q.GetCharactersInfo();
		
		if(!infoResponse.data){
			return 'ERR';
		}

		const propName: DataInternalProp = Object.keys(infoResponse.data)[0];

		const info: GT.InfoFieldsFragment = infoResponse.data[propName].info;

		const randomChoosenIds = getRandomChooseOfVariantsForEach(info.count, tileCount);


		const { data } = await wUrql.q.GetCharactersByIds({ids: randomChoosenIds});

		if(!data){
			return 'ERR';
		}

		return data.charactersByIds.map((e: GT.CharacterPreviewFieldsFragment) => (
			{
				type: 'character',
				data: e
			}
		));
	}

	

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

		const charRes = await wUrql.q.GetCharactersInfo();
		const charactersVariants = choosenVariantsForEachTile.filter(e => e === 1);
		const randomChoosenIds = getRandomChooseOfVariantsForEach(charRes.data.count, charactersVariants.length);

		const { data } = await wUrql.q.GetCharactersByIds({ids: randomChoosenIds});

		data.charactersByIds;

		
	
	
	
	}

	//makeNineTiles();
	console.log('nine')
	async function a(){
		console.log(
		wUrql,'\nasdf',
			await wUrql.q.GetCharactersByIds({ids: [1,2,3]}),
			await wUrql.q.GetCharactersInfo(),'\nmmm',
			await wUrql.q.GetLocationsByIds({ids: [1,2,3]}),
			await wUrql.q.GetLocationsInfo(),
			await wUrql.q.GetEpisodesByIds({ids: [1,2,3]}),
			await wUrql.q.GetEpisodesInfo(),



		)
	}

a()
</script>

<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}
		<p>tiles</p>
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
