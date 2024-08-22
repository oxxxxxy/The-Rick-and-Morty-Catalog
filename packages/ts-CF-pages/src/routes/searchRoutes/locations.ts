import type { GT, IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';

import { U } from '@tsL/utils';

import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';

import { 
	URLSearchParams_pageParameterName,
	makeFn_ignoreFnExecAfterExitValueTransferOnce
} from '@tsCF/pages';

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
	makeArguments_PageFilter,
	makeFnForSearchPageManagerWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer,
	makeFnPrepareArgsForFnThrowToDrawerFromGetReq,
	SearchPageManager,
	SearchPageDrawer
} from '@tsLF/pages';




export const makeArgumentsFor_GetLocations = (relatedQPCList: QueryParamCompatible_Base[]): GT.QueryLocationsArgs => makeArguments_PageFilter(relatedQPCList, URLSearchParams_pageParameterName);

export type LocationsSearchPageDependencies = {
	handlePaginationSelection: (pagination__exit_value: number) => void;
	handleLocationsSearchApply: (LocationsSearch__exit_values: QueryParamCompatible_Base[]) => void;
	searchPageManager: SearchPageManager;
	actionExecuterAfterMount: typeof U.ActionExecuterAfterCondition;
}

export type ArgumentsFor_initLocationsSearchPage = {
	pathName: string,
	set_tiles: (v: GT.LocationPreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	set_TileBoard_SearchValue: (v: TileBoard_SearchValue) => void;
	set_LocationsSearch__update_values: (v: QueryParamCompatible_Base[]) => void;
	pushStateFn: PushStateFnType;
	wUrql: IUrqlClientWrapper;
	wLocationChangeEventEmitter: WindowLocationChangeEventEmitter;
}

export const initLocationsSearchPage = (
	{
		pathName,
		set_tiles,
		set_LocationsSearch__update_values,
		set_TileBoard_SearchValue,
		pushStateFn,
		wLocationChangeEventEmitter,
		wUrql
	} : ArgumentsFor_initLocationsSearchPage
): LocationsSearchPageDependencies => {
	const searchPageDrawer = new SearchPageDrawer(
		{
			pathName,
			setExternalTiles: set_tiles,
			setExternalTileBoard_SearchValue: set_TileBoard_SearchValue,
			setExternalCFHSearch__update_values: set_LocationsSearch__update_values
		}
	);

	const searchPageManager = new SearchPageManager(
		{
			pathName,
			requestFn: makeFnForSearchPageManagerWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer(
					makeArgumentsFor_GetLocations,
					wUrql.q.GetLocations,
					makeFnPrepareArgsForFnThrowToDrawerFromGetReq('locations')
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

	const ActionId_ApplyDataFromLocationsSearch = 'ya realno debil ili tekuschee reshenie norm? ya huy znaet, ya prosto borus` za okonchanie proektika etogo...';

	actionExecuterAfterMount.addIdAction(
		ActionId_ApplyDataFromLocationsSearch,
		makeFn_ignoreFnExecAfterExitValueTransferOnce(
			(LocationsSearch__exit_values: QueryParamCompatible_Base[]) => {
				searchPageManager.applyCustomForm(LocationsSearch__exit_values)
			}
		)
	);

	const handleLocationsSearchApply = (LocationsSearch__exit_values: QueryParamCompatible_Base[]) => (
		actionExecuterAfterMount.execById(
			ActionId_ApplyDataFromLocationsSearch,
			[LocationsSearch__exit_values]
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
		handleLocationsSearchApply,
		searchPageManager,
		actionExecuterAfterMount
	};
};
