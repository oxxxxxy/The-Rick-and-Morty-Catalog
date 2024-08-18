import type { GT, WT } from '@tsC/api-graphql-to-ex';

import { U } from '@tsL/utils';

import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';

import {
	LocationSearchChangeEventEmitter,
	WindowLocationChangeEventEmitter
} from '@tsLF/wLocationChangeEvent';

import {
	makeArguments_PageFilter,
} from '@tsCF/pages';
import type {
	GenDataForCharacterTile,
} from '@tsCF/pages';




export const makeArgumentsFor_GetCharacters = (relatedQPCList: QueryParamCompatible_Base[]): GT.QueryCharactersArgs => makeArguments_PageFilter(relatedQPCList);

//export const makeArgumentsFor_genCharacterTileData


const init = (
	pathName: string,
	wLocationChangeEventEmitter: WindowLocationChangeEventEmitter,
) => {

	const lSCEEmitter = new LocationSearchChangeEventEmitter(
		{
			pathname: '/' + pathName,
		}
	);
	wLocationChangeEventEmitter.attach(lSCEEmitter);

};

