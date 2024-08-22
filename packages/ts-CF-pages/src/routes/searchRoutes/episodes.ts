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




export const makeArguments_PageFilterForGetEpisodes = (relatedQPCList: QueryParamCompatible_Base[]): GT.QueryEpisodesArgs => makeArguments_PageFilter(relatedQPCList, URLSearchParams_pageParameterName);

//ya takim gavno obrazom dostigayu bolee horoshih podskazok pri napisanii. ne tolko ot spellcheckera, no i neyming podskazivaet
//po idee eto horoshaya ideya, inache eto hueta(((
export type EpisodesSearchPageDependencies = SearchPageDependencies 
& {
	handleEpisodesSearchApply: (EpisodesSearch__exit_values: QueryParamCompatible_Base[]) => void;
	handleCFHSearchApply: undefined;
};

export type ArgumentsFor_initEpisodesSearchPage = ArgumentsFor_initSearchPage 
& {
	set_CFHSearch__update_values: undefined;
	set_EpisodesSearch__update_values: (v: QueryParamCompatible_Base[]) => void;
	wUrql: IUrqlClientWrapper;
	wUrql_q_GetItems: undefined;
	makeArguments_PageFilter: undefined;
	argumentFor_makeFnPrepareArgsForFnThrowToDrawerFromGetReq: undefined;
};

export const initEpisodesSearchPage = (
	{
		pathName,
		set_tiles,
		set_EpisodesSearch__update_values,
		set_TileBoard_SearchValue,
		pushStateFn,
		wLocationChangeEventEmitter,
		wUrql
	} : ArgumentsFor_initEpisodesSearchPage
): EpisodesSearchPageDependencies => {

	const searchPageDependencies = initSearchPage(
		{
			pathName,
			set_tiles,
			set_CFHSearch__update_values: set_EpisodesSearch__update_values,
			set_TileBoard_SearchValue,
			wUrql_q_GetItems: (v: Object): UT.OperationResultSource<UT.OperationResult> => wUrql.q.GetEpisodes(v),
			argumentFor_makeFnPrepareArgsForFnThrowToDrawerFromGetReq: 'episodes',
			pushStateFn,
			wLocationChangeEventEmitter,
			makeArguments_PageFilter: makeArguments_PageFilterForGetEpisodes
		}
	);

	searchPageDependencies.handleEpisodesSearchApply = searchPageDependencies.handleCFHSearchApply;
	delete searchPageDependencies.handleCFHSearchApply;

	// blyat' menya tak besit, chto spellchecker rugaetsa
	return searchPageDependencies;
};
