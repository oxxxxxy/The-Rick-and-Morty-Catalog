import type { UT } from '@tsC/api-graphql-to-ex';

import { U } from '@tsL/utils';

import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';

import { URLSearchParams_pageParameterName } from '@tsCF/pages';

import {
	LocationSearchChangeEventEmitter,
	WindowLocationChangeEventEmitter
} from '@tsLF/wLocationChangeEvent';

import type {
	NonTilesResultsForDrawingSearchPageTileBoard,
	TileBoard_SearchValue,
	PushStateFnType
} from '@tsLF/pages';
import {
	makeFnForSearchPageManagerWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer,
	makeFnPrepareArgsForFnThrowToDrawerFromGetReq,
	SearchPageManager,
	SearchPageDrawer,
	makeFn_ignoreFnExecAfterExitValueTransferOnce
} from '@tsLF/pages';




export type SearchPageDependencies = {
	handlePaginationSelection: (pagination__exit_value: number) => void;
	handleCFHSearchApply: (CFHSearch__exit_values: QueryParamCompatible_Base[]) => void;
	searchPageManager: SearchPageManager;
	actionExecuterAfterMount: typeof U.ActionExecuterAfterCondition;
}

export type ArgumentsFor_initSearchPage = {
	pathName: string,
	set_tiles: (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	set_TileBoard_SearchValue: (v: TileBoard_SearchValue) => void;
	set_CFHSearch__update_values: (v: QueryParamCompatible_Base[]) => void;
	pushStateFn: PushStateFnType;
		wUrql_q_GetItems: (v: Object) => UT.OperationResultSource<UT.OperationResult>,
	wLocationChangeEventEmitter: WindowLocationChangeEventEmitter;
	makeArguments_PageFilter: (v: QueryParamCompatible_Base[]) => Object;
	argumentFor_makeFnPrepareArgsForFnThrowToDrawerFromGetReq: string;
};

export const initSearchPage = (
	{
		pathName,
		set_tiles,
		set_CFHSearch__update_values,
		set_TileBoard_SearchValue,
		pushStateFn,
		wLocationChangeEventEmitter,
		wUrql_q_GetItems,
		argumentFor_makeFnPrepareArgsForFnThrowToDrawerFromGetReq,
		makeArguments_PageFilter
	} : ArgumentsFor_initSearchPage
): SearchPageDependencies => {
	const searchPageDrawer = new SearchPageDrawer(
		{
			pathName,
			setExternalTiles: set_tiles,
			setExternalTileBoard_SearchValue: set_TileBoard_SearchValue,
			setExternalCFHSearch__update_values: set_CFHSearch__update_values
		}
	);

	const searchPageManager = new SearchPageManager(
		{
			pathName,
			requestFn: makeFnForSearchPageManagerWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer(
					makeArguments_PageFilter,
					wUrql_q_GetItems,
					makeFnPrepareArgsForFnThrowToDrawerFromGetReq(argumentFor_makeFnPrepareArgsForFnThrowToDrawerFromGetReq)
				),
			pushStateFn,
			searchPageDrawer,
			URLSearchParams_pageParameterName
		}
	);


	const lSCEEmitter = new LocationSearchChangeEventEmitter(
		{
			pathname: '/' + pathName,
		}
	);
	lSCEEmitter.attach(searchPageManager);

	wLocationChangeEventEmitter.attach(lSCEEmitter);


	const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();
  
	const ActionId_ApplyDataFromCFHSearch = 'ya realno debil ili tekuschee reshenie norm? ya huy znaet, ya prosto borus` za okonchanie proektika etogo...';
  
	actionExecuterAfterMount.addIdAction(
		ActionId_ApplyDataFromCFHSearch,
		makeFn_ignoreFnExecAfterExitValueTransferOnce(
			(CFHSearch__exit_values: QueryParamCompatible_Base[]) => {
				searchPageManager.applyCustomForm(CFHSearch__exit_values)
			}
		)
	);

	const handleCFHSearchApply = (CFHSearch__exit_values: QueryParamCompatible_Base[]) => (
		actionExecuterAfterMount.execById(
			ActionId_ApplyDataFromCFHSearch,
			[CFHSearch__exit_values]
		)
	);


	const ActionId_ClickPaginationItemButton = 'clickat\' stranicu mi ne brosim, adin chetire vosem` vosem`';

	actionExecuterAfterMount.addIdAction(
		ActionId_ClickPaginationItemButton,
		(pagination__exit_value: number) => searchPageManager.selectPage(pagination__exit_value)
	);

	const handlePaginationSelection = (pagination__exit_value: number) => (
		actionExecuterAfterMount.execById(
			ActionId_ClickPaginationItemButton,
			[pagination__exit_value]
		)
	);



	return {
		handlePaginationSelection,
		handleCFHSearchApply,
		searchPageManager,
		actionExecuterAfterMount
	};
};
