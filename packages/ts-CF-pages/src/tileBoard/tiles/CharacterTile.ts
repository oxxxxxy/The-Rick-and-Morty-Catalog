import type { GT } from '@tsC/api-graphql-to-ex';
import { 
	getCharactersPath,
	getLocationsPath
} from './index.ts';




export type GenDataLocation = {
	path: string | null;
	name: string;
};

export type GenDataForCharacterTile = {
	path: string;
	name: string;
	status: string;
	location: GenDataLocation;
	origin: GenDataLocation;
	gender: string;
	image: string;
	species: string;
	type: string;
};

export const getCssClass_CharacterStatusIcon = (status: string | any
): string | undefined => {
	if(typeof status !== 'string'){
		return 'character-status__icon-unknown';
	}
	switch(status.toLowerCase()){
		case 'alive':
			return 'character-status__icon-alive';
		case 'dead':
			return 'character-status__icon-dead';
		case 'unknown':
			return 'character-status__icon-unknown';
	}
}

export const genCharacterTileData = (data: GT.CharacterPreviewFieldsFragment): GenDataForCharacterTile => {
	const gen = {...data};

	gen.location = {};
	gen.origin = {};

	delete gen.id;
	delete gen.__typename;

	gen.path = getCharactersPath(data.id);
	
	//gen.status = gen.status.slice(0, 1).toUpperCase() + gen.status.slice(1);
	
	if(data.origin?.id){
		gen.origin.path = getLocationsPath(data.origin.id);
	}
	gen.origin.name = data.origin.name;
	
	if(data.location?.id){
		gen.location.path = getLocationsPath(data.location.id);
	}
	gen.location.name = data.location.name;

	return gen;
};
