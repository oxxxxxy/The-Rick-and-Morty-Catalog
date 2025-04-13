import {
	ItemPageManager,
	makeFnForItemPageManagerMakeReqFn,
	LittleChangeableStringElementDrawer
} from '@tsLF/pages';
import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';

import { API_CHARACTERS__PATH } from '@tsCF/data';

import { capitalizeWord } from '@tsLF/pages';

import type { GT, IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';




export type ArgumentsFor_initCharacterIdPage = {
	set_bigTile: (v: GT.CharacterFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	set_pageTitle: (v: string) => void;
	character_id: string;
	wUrql: IUrqlClientWrapper;
};

export const initCharacterIdPage = (
	{
		set_pageTitle,
		set_bigTile,
		character_id,
		wUrql
	} : ArgumentsFor_initCharacterIdPage
): void => {

		const pageTitleDrawer = new LittleChangeableStringElementDrawer(
		{
			setElementValueFn: set_pageTitle,
			elementCauseValues: [
				{
					cause: 'not found',
					value: 'Character was not found'
				},
				{
					cause: 'error',
					value: 'Error'
				},
				{
					cause: 'ok',
					value: (data: GT.CharacterFieldsFragment) => data.name
				},
				{
					cause: 'loading',
					value: 'Character loading'
				}
			]
		}
	);

	const itemPageManager = new ItemPageManager(
		{
			set_bigTile,
			pageTitleDrawer,
			itemId: Number.parseInt(character_id),
			makeReqFn: makeFnForItemPageManagerMakeReqFn(wUrql.q.GetCharacter)
		}
	);
};

// this is a bad solution, but i want to make it fast. project doesn't have a future
export const initCharacterIdPage_V2 = (
	{
		set_pageTitle,
		set_bigTile,
		character_id,
		wUrql,
		APP_NAME
	} : ArgumentsFor_initCharacterIdPage & {
		APP_NAME: string
	}
): ItemPageManager => {

		const wordInPluralForm = capitalizeWord(API_CHARACTERS__PATH.name);
		const TRAMCThemeObject = wordInPluralForm.slice(0, wordInPluralForm.length - 1);
		const pageLoadingTitle = `${TRAMCThemeObject} Id${character_id} loading`;

		const setDocumentDescription = (v: string) => {
			document.querySelector('meta[name="description"]').content = v;
		}


		const pageTitleDrawer = new LittleChangeableStringElementDrawer(
		{
			setElementValueFn: set_pageTitle,
			elementCauseValues: [
				{
					cause: 'not found',
					value: 'Character was not found'
				},
				{
					cause: 'error',
					value: 'Error'
				},
				{
					cause: 'ok',
					value: (data: GT.CharacterFieldsFragment) => {
						setDocumentDescription(`${ APP_NAME } • Character: ${ data.name }`);
						
						return `Character: ${ data.name } • ${ APP_NAME }`;
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
			itemId: Number.parseInt(character_id),
			makeReqFn: makeFnForItemPageManagerMakeReqFn(wUrql.q.GetCharacter)
		}
	);

	return itemPageManager
};

