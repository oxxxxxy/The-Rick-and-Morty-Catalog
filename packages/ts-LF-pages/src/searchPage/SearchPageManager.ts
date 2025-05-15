import type { 
	ArgumentsFor_SearchPageDrawer_drawDataFromReq,
	PushStateFnType
} from '@tsLF/pages';
import {
	pushIntoWindowHistory,
	SearchPageDrawer
} from '@tsLF/pages';

import type { LocationSearchChangeEventData } from '@tsLF/wLocationChangeEvent';

import { 
	QPCListHolder,
	getQPCBaseListFromURLSearchParams
} from '@tsLF/forURLSP';
import type {	QueryParamCompatible_Base } from '@tsLF/forURLSP';

import { Observer } from '@tsL/patterns';




export type ArgumentsFor_SearchPageManager_requestFn = (
	v: QueryParamCompatible_Base[],
	SearchPageDrawer_drawDataFromReq: (v: ArgumentsFor_SearchPageDrawer_drawDataFromReq) => void
) => () => void;

export type ArgumentsFor_URLSearchParamsBasedFilterManager = {
	pathName: string;
	requestFn: ArgumentsFor_SearchPageManager_requestFn;
	pushStateFn: PushStateFnType;
	searchPageDrawer: SearchPageDrawer;
	URLSearchParams_pageParameterName: string;
};

export class SearchPageManager extends Observer{
	#pathName: string;
	#requestFn: ArgumentsFor_SearchPageManager_requestFn;
	#QPCListHolder: QPCListHolder;
	#pushStateFn: PushStateFnType;
	#unsubscribe: undefined | (() => void);
	#searchPageDrawer: SearchPageDrawer;
	#inited: undefined | true;
	#URLSearchParams_pageParameterName: string;


	constructor(
	{
		pathName,
		requestFn,
		pushStateFn,
		searchPageDrawer,
		URLSearchParams_pageParameterName
	} : ArgumentsFor_URLSearchParamsBasedFilterManager
	){
		super();

		this.#requestFn = requestFn;
		this.#pathName = pathName;
		this.#pushStateFn = pushStateFn;
		this.#searchPageDrawer = searchPageDrawer;
		this.#URLSearchParams_pageParameterName = URLSearchParams_pageParameterName;
		
		this.#QPCListHolder = new QPCListHolder();
	}
	
	#prepareNewRequest(){
		if(this.#unsubscribe){
			this.#unsubscribe();
		}

		this.#searchPageDrawer.drawLoading();
	}

	#finishNewRequest(){
		const T = this;
		this.#unsubscribe = this.#requestFn(
			this.#QPCListHolder.getQPCList(),
			(v) => T.#searchPageDrawer.drawDataFromReq(v)
		);
	}


	onNotification(data: LocationSearchChangeEventData){
		this.#loadFromHistoryLocationSearch(data);
	}

	#loadFromHistoryLocationSearch(data: LocationSearchChangeEventData){
		this.#prepareNewRequest();

		const urlSP = new URLSearchParams(data.searchParamsData);

		const qpcList = getQPCBaseListFromURLSearchParams(urlSP);
		
		this.#QPCListHolder.setQPCList(qpcList);
		
		this.#searchPageDrawer.drawCustomForm(this.#QPCListHolder.getQPCList());

		this.#finishNewRequest();
	}

	selectPage(pagination__exit_value: number){
		this.#prepareNewRequest();

		const qpcList = this.#QPCListHolder.getQPCList();
		
		const foundIndex = qpcList.findIndex(e => e.param === this.#URLSearchParams_pageParameterName);
		if(foundIndex >= 0){
			qpcList.splice(foundIndex, 1);
		}

		// not only bcz i want to not see ?page=1
		// but bcz urql cache is thinking default req with params not equal to req with the same params and page=1
		if(pagination__exit_value != 1){
			const pageQPC: QueryParamCompatible_Base = {
				param: this.#URLSearchParams_pageParameterName,
				value: pagination__exit_value.toString()
			};

			qpcList.push(pageQPC);
		}

		this.#QPCListHolder.setQPCList(qpcList);
		
		pushIntoWindowHistory(this.#QPCListHolder.getQPCList(), this.#pathName, this.#pushStateFn);

		this.#finishNewRequest();
	}
	
	applyCustomForm(exit_values: QueryParamCompatible_Base[]){
		this.#prepareNewRequest();

		this.#QPCListHolder.setQPCList(exit_values);

		this.#searchPageDrawer.drawCustomForm(this.#QPCListHolder.getQPCList());

		pushIntoWindowHistory(this.#QPCListHolder.getQPCList(), this.#pathName, this.#pushStateFn);

		this.#finishNewRequest();
	}

	init(v: QueryParamCompatible_Base[]){
		if(this.#inited){
			return;
		}

		this.#inited = true;


		this.#QPCListHolder.setQPCList(v);
		
		this.#finishNewRequest();
	}
}
