import type { PositiveInteger } from '@tsL/types';

import type { GT } from '@tsC/api-graphql-to-ex';
	
import type { 
	API_CHARACTERS__PATH__NAME,
	API_EPISODES__PATH__NAME,
	API_LOCATIONS__PATH__NAME
} from '@tsCF/data';
import { 
	API_CHARACTERS__PATH,
	API_EPISODES__PATH,
	API_LOCATIONS__PATH
} from '@tsCF/data';




export * from './CharacterTile.ts';
export * from './EpisodeTile.ts';
export * from './LocationTile.ts';

export type TileItem_Character = {
	type: API_CHARACTERS__PATH__NAME;
	data: GT.CharacterPreviewFieldsFragment;
}

export type TileItem_Location = {
	type: API_LOCATIONS__PATH__NAME;
	data: GT.LocationPreviewFieldsFragment;
}

export type TileItem_Episode = {
	type: API_EPISODES__PATH__NAME;
	data: GT.EpisodePreviewFieldsFragment;
}

export type TileItem = TileItem_Character | TileItem_Episode | TileItem_Location;

export type ERR = 'ERR';

export type TileItems = TileItem[];


export const getCharactersPath = (id: PositiveInteger<number>): string => `/${API_CHARACTERS__PATH.name}/` + id;

export const getLocationsPath = (id: PositiveInteger<number>): string => `/${API_LOCATIONS__PATH.name}/` + id;

export const getEpisodesPath = (id: PositiveInteger<number>): string =>`/${API_EPISODES__PATH.name}/` + id;
