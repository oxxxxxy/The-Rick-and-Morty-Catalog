import type { UT, GT, IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';

import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';

import { 
	URLSearchParams_pageParameterName,
	initSearchPage
} from '@tsCF/pages';
import type { 
	ArgumentsFor_initSearchPage,
	SearchPageDependencies
} from '@tsCF/pages';

import { makeArguments_PageFilter } from '@tsLF/pages';




export const makeArguments_PageFilterForGetCharacters = (relatedQPCList: QueryParamCompatible_Base[]): GT.QueryCharactersArgs => makeArguments_PageFilter(relatedQPCList, URLSearchParams_pageParameterName);

//ya takim gavno obrazom dostigayu bolee horoshih podskazok pri napisanii. ne tolko ot spellcheckera, no i neyming podskazivaet
//po idee eto horoshaya ideya, inache eto hueta(((
export type CharactersSearchPageDependencies = SearchPageDependencies 
& {
	handleCharactersSearchApply: (CharactersSearch__exit_values: QueryParamCompatible_Base[]) => void;
	handleCFHSearchApply: undefined;
};

export type ArgumentsFor_initCharactersSearchPage = ArgumentsFor_initSearchPage 
& {
	set_CFHSearch__update_values: undefined;
	set_CharactersSearch__update_values: (v: QueryParamCompatible_Base[]) => void;
	wUrql: IUrqlClientWrapper;
	wUrql_q_GetItems: undefined;
	makeArguments_PageFilter: undefined;
	argumentFor_makeFnPrepareArgsForFnThrowToDrawerFromGetReq: undefined;
};

export const initCharactersSearchPage = (
	{
		pathName,
		set_tiles,
		set_CharactersSearch__update_values,
		set_TileBoard_SearchValue,
		pushStateFn,
		wLocationChangeEventEmitter,
		wUrql
	} : ArgumentsFor_initCharactersSearchPage
): CharactersSearchPageDependencies => {

	const searchPageDependencies = initSearchPage(
		{
			pathName,
			set_tiles,
			set_CFHSearch__update_values: set_CharactersSearch__update_values,
			set_TileBoard_SearchValue,
			wUrql_q_GetItems: (v: Object): UT.OperationResultSource<UT.OperationResult> => wUrql.q.GetCharacters(v),
			argumentFor_makeFnPrepareArgsForFnThrowToDrawerFromGetReq: 'characters',
			pushStateFn,
			wLocationChangeEventEmitter,
			makeArguments_PageFilter: makeArguments_PageFilterForGetCharacters
		}
	);

	searchPageDependencies.handleCharactersSearchApply = searchPageDependencies.handleCFHSearchApply;
	delete searchPageDependencies.handleCFHSearchApply;

	// blyat' menya tak besit, chto spellchecker rugaetsa
	return searchPageDependencies;
};
