import type { UT } from '@tsC/api-graphql-to-ex';

import type {	QueryParamCompatible_Base } from '@tsLF/forURLSP';

import { TileBoard_SearchValueBuilder } from '@tsLF/pages';
import type { 
	TileBoard_SearchValue,
	NonTilesResultsForDrawingSearchPageTileBoard
} from '@tsLF/pages';




export type ArgumentsFor_SearchPageDrawer = {
	pathName: string;
	setExternalTiles: (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	setExternalTileBoard_SearchValue: (v: TileBoard_SearchValue) => void;
	setExternalCFHSearch__update_values: (v: QueryParamCompatible_Base[]) => void;
};

export type TempPropsOfTileBoard_SearchValue = TileBoard_SearchValue & {
	availableItemsTitle: undefined
};

export type ArgumentsFor_SearchPageDrawer_drawDataFromReq = {
	data?: {
		tempPropsOfTileBoard_SearchValue: TempPropsOfTileBoard_SearchValue
		dataForTilesList: Object[] // ne sovsem ponimayu kak prokinut' tot je GT.CharacterPreviewFieldsFragment , podskajite, pls. Sdes' kak bi obschiy object kotoriy tip prokidivaet v prinimayushiy takoy je tip, kotoriy budet vihodit' iz prepareArgsForFnThrowToDrawerFromGetReq
	},
	error?: UT.CombinedError
};

export class SearchPageDrawer{
	#tileBoard_SearchValueBuilder: TileBoard_SearchValueBuilder;
	#setExternalTiles: (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	#setExternalTileBoard_SearchValue: (v: TileBoard_SearchValue) => void;
	#setExternalCFHSearch__update_values: (v: QueryParamCompatible_Base[]) => void;


	constructor(
		{
			pathName,
			setExternalTiles,
			setExternalTileBoard_SearchValue,
			setExternalCFHSearch__update_values
		} : ArgumentsFor_SearchPageDrawer
	){
		
		this.#tileBoard_SearchValueBuilder = new TileBoard_SearchValueBuilder(
			{
				availableItemsTitle: pathName
			}
		);

		this.#setExternalTiles = setExternalTiles;
		this.#setExternalTileBoard_SearchValue = setExternalTileBoard_SearchValue;
		this.#setExternalCFHSearch__update_values = setExternalCFHSearch__update_values;
	}

	drawNotFound(){
		this.#setExternalTiles('NOT FOUND');
	}
	
	drawLoading(){
		this.#setExternalTiles('LOADING');
	}
	
	drawErr(){
		this.#setExternalTiles('ERR');
	}

	drawCustomForm(v: QueryParamCompatible_Base[]){
		console.log(JSON.stringify(v), 'searchPageDrawer drawCustomForm')
		this.#setExternalCFHSearch__update_values(v);
	}


	#svelteCrutch_drawDataFromReq_lastTimeout: undefined | ReturnType<typeof setTimeout>; // nu a cho delat'? umniy dohuya? podskaji togda pojalusta mne durachku T_T pomogite...

	drawDataFromReq(v: ArgumentsFor_SearchPageDrawer_drawDataFromReq){
		const { data, error } = v;

		if(error){
			this.drawErr();

			return;
		}

		if(!data){
			this.drawNotFound();

			return;
		}
		
		const { tempPropsOfTileBoard_SearchValue, dataForTilesList } = data;

		const tileBoard_SearchValue = this.#tileBoard_SearchValueBuilder
			.addSelectedPage(tempPropsOfTileBoard_SearchValue.selectedPage)
			.addPageCount(tempPropsOfTileBoard_SearchValue.pageCount)
			.addAvailableItemsCount(tempPropsOfTileBoard_SearchValue.availableItemsCount)
			.build();

		const T = this;
console.log(JSON.stringify(tileBoard_SearchValue), 'searchPageDrawer drawDataFromReq')
		T.#svelteCrutch_drawDataFromReq_lastTimeout = setTimeout(
			() => {
				T.#setExternalTileBoard_SearchValue(tileBoard_SearchValue);

				T.#setExternalTiles(dataForTilesList);
			},
			5
		);
	}
}
