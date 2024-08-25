import {
	ItemPageManager,
	makeFnForItemPageManagerMakeReqFn,
	LittleChangeableStringElementDrawer
} from '@tsLF/pages';
import type { NonTilesResultsForDrawingSearchPageTileBoard } from '@tsLF/pages';

import type { GT, IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';




export type ArgumentsFor_initEpisodeIdPage = {
	set_bigTile: (v: GT.EpisodeFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	set_pageTitle: (v: string) => void;
	episode_id: string;
	wUrql: IUrqlClientWrapper;
};

export const initEpisodeIdPage = (
	{
		set_pageTitle,
		set_bigTile,
		episode_id,
		wUrql
	} : ArgumentsFor_initEpisodeIdPage
): void => {

	const pageTitleDrawer = new LittleChangeableStringElementDrawer(
		{
			setElementValueFn: set_pageTitle,
			elementCauseValues: [
				// da ya huy ego znaet,
				// tut v lyubom sluchae sostoyanie kakoe-to, a mne uje ochen' len' bolee detal'no razobrat'sya v primerah podobnojo,
				// ya prosto hochu na minimalku uje vityanut' proekt.
				// doljno je bit' v nem chto-to horoschee, poetomu zdes' ya pozvolyu sebe detal'no ne produmivat', potomu chto razvitiya tut ne budet, izvinite.
				// ya prosto hochu na rabotu, boje, suka, dayte vibrat'sa iz gavna etogo, eto prosto pizdec
				{
					cause: 'not found',
					value: 'Episode was not found'
				},
				{
					cause: 'error',
					value: 'Error'
				},
				{
					cause: 'ok',
					value: (data: GT.EpisodeFieldsFragment) => 'Episode ' + data.episode
				},
				{
					cause: 'loading',
					value: 'Episode loading'
				}
			]
		}
	);

	const itemPageManager = new ItemPageManager(
		{
			set_bigTile,
			pageTitleDrawer,
			itemId: Number.parseInt(episode_id),
			makeReqFn: makeFnForItemPageManagerMakeReqFn(wUrql.q.GetEpisode)
		}
	);
};
