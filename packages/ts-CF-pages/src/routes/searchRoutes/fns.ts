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
	SearchPageDrawer
} from '@tsLF/pages';




export const makeFn_ignoreFnExecAfterExitValueTransferOnce = (fn: () => {}) => {
	/* const ignoreExitValueTransferOnceCrutch = new U.IgnoreFewTimesCrutch(1);

	const wrappedSveltePushStateBczThereIsErrorWhenLoaded = (p, whs) => {
		// window.history.pushState(whs, '', p); // <-- this works fine, but svelte pushState is not.
		// so, this miss/crutch/shit only for first error, which emits when loaded...
		// or I am doing a peace of shit again... goddamn...
		// UPD1: it appears only on loading exactly host/characters... so, i need smart crutch(shit solution(or svelte design is shit(or i'm fucking idiot(shut up(okay))))).
		// UPD2: it appears when user navigate to host/characters and when loading exactly this path... so, i just need ingnore exit_value transfer once. bcz i don't need the same value in history state twice.
		// upd3: i'm idiot. this appears bcz i transfer navigation_values... so, it's crutch to save design. i don't want to recode it to divide CustomFormHolder item draw and transfer parts on two separate things.

		if(!ignoreExitValueTransferOnceCrutch.isFinished()){
			ignoreExitValueTransferOnceCrutch.do();
		} else {
			pushState(p, whs);
		}
	}; */

	const ignoreExitValueTransferOnceCrutch = new U.IgnoreFewTimesCrutch(1);
	
	return function(){
		if(!ignoreExitValueTransferOnceCrutch.isFinished()){
			ignoreExitValueTransferOnceCrutch.do();
		} else {
			fn(...arguments);
		}
	};
};


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
