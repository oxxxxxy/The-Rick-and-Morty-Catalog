import type { PositiveInteger } from '@tsL/types';

	
import { 
	API_CHARACTERS__PATH,
	API_EPISODES__PATH,
	API_LOCATIONS__PATH
} from '@tsCF/data';




export const getCharactersPath = (id: PositiveInteger<number>): string => `/${API_CHARACTERS__PATH.name}/` + id;

export const getLocationsPath = (id: PositiveInteger<number>): string => `/${API_LOCATIONS__PATH.name}/` + id;

export const getEpisodesPath = (id: PositiveInteger<number>): string =>`/${API_EPISODES__PATH.name}/` + id;

