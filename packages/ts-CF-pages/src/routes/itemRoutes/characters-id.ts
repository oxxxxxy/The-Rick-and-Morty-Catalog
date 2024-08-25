import {
	ItemPageManager,
	makeFnForItemPageManagerMakeReqFn,
	LittleChangeableStringElementDrawer
} from '@tsLF/pages';
import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';

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
