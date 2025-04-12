import {
	ItemPageManager,
	makeFnForItemPageManagerMakeReqFn,
	LittleChangeableStringElementDrawer
} from '@tsLF/pages';
import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';

import type { GT, IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';




export type ArgumentsFor_initLocationIdPage = {
	set_bigTile: (v: GT.LocationFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	set_pageTitle: (v: string) => void;
	location_id: string;
	wUrql: IUrqlClientWrapper;
};

export const initLocationIdPage = (
	{
		set_pageTitle,
		set_bigTile,
		location_id,
		wUrql
	} : ArgumentsFor_initLocationIdPage
): void => {

		const pageTitleDrawer = new LittleChangeableStringElementDrawer(
		{
			setElementValueFn: set_pageTitle,
			elementCauseValues: [
				{
					cause: 'not found',
					value: 'Location was not found'
				},
				{
					cause: 'error',
					value: 'Error'
				},
				{
					cause: 'ok',
					value: (data: GT.LocationFieldsFragment) => data.name
				},
				{
					cause: 'loading',
					value: 'Location loading'
				}
			]
		}
	);

	const itemPageManager = new ItemPageManager(
		{
			set_bigTile,
			pageTitleDrawer,
			itemId: Number.parseInt(location_id),
			makeReqFn: makeFnForItemPageManagerMakeReqFn(wUrql.q.GetLocation)
		}
	);
};

export const initLocationIdPage_V2 = (
	{
		set_pageTitle,
		set_bigTile,
		location_id,
		wUrql
	} : ArgumentsFor_initLocationIdPage
): ItemPageManager => {

		const pageTitleDrawer = new LittleChangeableStringElementDrawer(
		{
			setElementValueFn: set_pageTitle,
			elementCauseValues: [
				{
					cause: 'not found',
					value: 'Location was not found'
				},
				{
					cause: 'error',
					value: 'Error'
				},
				{
					cause: 'ok',
					value: (data: GT.LocationFieldsFragment) => data.name
				},
				{
					cause: 'loading',
					value: 'Location loading'
				}
			]
		}
	);

	const itemPageManager = new ItemPageManager(
		{
			set_bigTile,
			pageTitleDrawer,
			itemId: Number.parseInt(location_id),
			makeReqFn: makeFnForItemPageManagerMakeReqFn(wUrql.q.GetLocation)
		}
	);

	return itemPageManager
};

