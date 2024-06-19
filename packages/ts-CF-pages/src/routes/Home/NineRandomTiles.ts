import type { PositiveInteger } from '@tsL/types';

import type { GT, WT } from '@tsC/api-graphql-to-ex';

import { U } from '@tsL/utils';

import { 
	API_CHARACTERS__PATH,
	API_EPISODES__PATH,
	API_LOCATIONS__PATH
} from '@tsCF/data';
import type { 
	API_CHARACTERS__PATH__NAME,
	API_EPISODES__PATH__NAME,
	API_LOCATIONS__PATH__NAME
} from '@tsCF/data';

import type { TileItems, ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';




export type GetItemsInfoInternalProp = API_CHARACTERS__PATH__NAME | API_LOCATIONS__PATH__NAME | API_EPISODES__PATH__NAME;
export type GetItemsByIdsInternalProp = 'charactersByIds' | 'locationsByIds' | 'episodesByIds';


export const randomChooseOfVariantsForEach = async (
	variantCount: PositiveInteger<number>,
	eachCount: PositiveInteger<number>
): Promise<number[]> => {
	const arr = [...Array(eachCount).keys()];

	for(let i of arr){
		arr[i] = Math.round((variantCount - 1) * Math.random()) + 1;
		await U.delay();
	}

	return arr;
};


export const getRandomItemTiles = async (
	tileCount: PositiveInteger<number>,
	GetItemsInfo: WT.GetCharactersInfoFn | WT.GetLocationsInfoFn | WT.GetEpisodesInfoFn,
	GetItemsByIds: WT.GetCharactersByIdsFn | WT.GetLocationsByIdsFn | WT.GetEpisodesByIdsFn,
	typeName: GetItemsInfoInternalProp
): Promise<undefined | TileItems> => {

	if(!tileCount){
		return;
	}
	
	const infoResponse = await GetItemsInfo();
	
	if(!infoResponse.data){
		return;
	}

	const itemsProp: GetItemsInfoInternalProp = Object.keys(infoResponse.data)[0];

	const info: GT.InfoFieldsFragment = infoResponse.data[itemsProp].info;

	if(!info.count){
		return;
	}


	const randomChoosenIds = await randomChooseOfVariantsForEach(info.count, tileCount);


	const byIdsResponse = await GetItemsByIds({ids: randomChoosenIds.map( e => e + '' )});

	if(!byIdsResponse.data){
		return;
	}

	const byIdsProp: GetItemsByIdsInternalProp = Object.keys(byIdsResponse.data)[0];

	return byIdsResponse.data[byIdsProp].map(
		(
			e: GT.CharacterPreviewFieldsFragment | GT.LocationPreviewFieldsFragment | GT.EpisodePreviewFieldsFragment
		) => (
			{
				type: typeName,
				data: e
			}
		)
	);
}


export type getRandomItemTilesWrapFn = (
	tileCount: PositiveInteger<number>,
	wUrql: WT.IUrqlClientWrapper 
) => Promise<undefined | TileItems>;

export const getRandomCharacterTiles: getRandomItemTilesWrapFn = async ( 
	tileCount: PositiveInteger<number>,
	wUrql: WT.IUrqlClientWrapper    
): Promise<undefined | TileItems> =>  
	await getRandomItemTiles(
		tileCount,
		wUrql.q.GetCharactersInfo,
		wUrql.q.GetCharactersByIds,
		API_CHARACTERS__PATH.name
	);

export const getRandomLocationTiles: getRandomItemTilesWrapFn = async ( 
	tileCount: PositiveInteger<number>,
	wUrql: WT.IUrqlClientWrapper    
): Promise<undefined | TileItems> =>  
	await getRandomItemTiles(
		tileCount,
		wUrql.q.GetLocationsInfo,
		wUrql.q.GetLocationsByIds,
		API_LOCATIONS__PATH.name
	);

export const getRandomEpisodeTiles: getRandomItemTilesWrapFn = async ( 
	tileCount: PositiveInteger<number>,
	wUrql: WT.IUrqlClientWrapper    
): Promise<undefined | TileItems> =>  
	await getRandomItemTiles(
		tileCount,
		wUrql.q.GetEpisodesInfo,
		wUrql.q.GetEpisodesByIds,
		API_EPISODES__PATH.name
	);


export const randomTileWraps: getRandomItemTilesWrapFn[] = [
	getRandomEpisodeTiles,
	getRandomCharacterTiles,
	getRandomLocationTiles
];


export const getSomeRandomTiles = async (
	wUrql: WT.IUrqlClientWrapper,
	variants: getRandomItemTilesWrapFn[],
	tileCount: PositiveInteger<number> = 9
):Promise<TileItems | ERR> => {
	const variatCountOfCharactersLocationsEpisodes: PositiveInteger<number> = variants.length;

	const choosenVariantsForEachTile: PositiveInteger<number>[] = await randomChooseOfVariantsForEach(
		variatCountOfCharactersLocationsEpisodes,
		tileCount
	);


	const sequenceOfEachVariant = variants.map(
		( e, i ) => choosenVariantsForEachTile.filter(e => e === i + 1)
	);

	const sequenceOfRandomTilesOfEachVariant: Array<TileItems | undefined> = [...Array(variants.length)].map( e => [] );

	for(let i = 0, arrOfArrs = sequenceOfEachVariant; i < arrOfArrs.length; i++){
		sequenceOfRandomTilesOfEachVariant[i] = await variants[i](arrOfArrs[i].length, wUrql);
	}


	const tileItems: TileItems = [];

	for(let i = 0; i < choosenVariantsForEachTile.length; i++){
		const e = choosenVariantsForEachTile[i] - 1;

		const arr = sequenceOfRandomTilesOfEachVariant[e];

		if(!!arr && arr.length){
			tileItems.push(arr.splice(0, 1)[0]);
		}
	}


	if(tileItems.length){
		return tileItems;
	}

	return 'ERR';
}

