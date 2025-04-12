import {
	ItemPageManager,
	makeFnForItemPageManagerMakeReqFn,
	LittleChangeableStringElementDrawer
} from '@tsLF/pages';
import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';

import { API_LOCATIONS__PATH } from '@tsCF/data';

import { capitalizeWord } from '@tsLF/pages';

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


// this is a bad solution, but i want to make it fast. project doesn't have a future
export const initLocationIdPage_V2 = (
	{
		set_pageTitle,
		set_bigTile,
		location_id,
		wUrql,
		APP_NAME
	} : ArgumentsFor_initLocationIdPage & {
		APP_NAME: string
	}
): ItemPageManager => {

		const wordInPluralForm = capitalizeWord(API_LOCATIONS__PATH.name);
		const TRAMCThemeObject = wordInPluralForm.slice(0, wordInPluralForm.length - 1);
		const pageLoadingTitle = `${TRAMCThemeObject} Id${location_id} loading`;

		const setDocumentDescription = (v: string) => {
			document.querySelector('meta[name="description"]').content = v;
		}


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
					value: (data: GT.LocationFieldsFragment) => {
						setDocumentDescription(`${ APP_NAME } • Location: ${ data.name }`);
						
						return `Location: ${ data.name } • ${ APP_NAME }`;
					}
				},
				{
					cause: 'loading',
					value: `${ pageLoadingTitle } • ${ APP_NAME }`
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

