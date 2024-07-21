import {
	Observable,
	Observer,
	ArgumentsFor_Observable
} from '@tsL/patterns';


import { WindowLocationData } from './index.ts';




export type ArgumentsFor_LocationSearchChangeEventEmitter = ArgumentsFor_Observable
& {
	pathname: string;
};

export type IndexedSearchParam = {
	value: string;
	id: number;
};

export class LocationSearchChangeEventEmitter extends Observable implements Observer{
	readonly pathname: string;
	#previousSearchParams: IndexedSearchParam[] = [];
	#currentSearchParams: IndexedSearchParam | undefined;
	

	constructor(
		{
			pathname,
			observers
		} : ArgumentsFor_LocationSearchChangeEventEmitter
	){
		super({observers});
		
		const T = this;

		T.pathname = pathname;

		const interval = setInterval(
			() => {
				try{
					T.#pushToPreviousSearchParams(window.location.search);
					T.#setCurrentSearchParam();

					clearInterval(interval);
				} catch (e){
					return;
				}
			}
		);
	}

	#pushToPreviousSearchParams(searchParam: string | IndexedSearchParam){
		const type = typeof searchParam;

		if(type === 'object'){
			searchParam = {...searchParam};

			searchParam.id = this.#previousSearchParams.length;
		}

		searchParam = {
			value: searchParam,
			id: this.#previousSearchParams.length
		}

		this.#previousSearchParams.push(searchParam);
	}

	#setCurrentSearchParam(searchParam?: IndexedSearchParam){
		switch(typeof searchParam){
			case 'object':
				searchParam = {...searchParam};
				break;
			case 'undefined':
				searchParam = {...this.#previousSearchParams[this.#previousSearchParams.length - 1]}
				break;
		}

		this.#currentSearchParams = searchParam;
	}

	#getEventData(): LocationSearchChangeEventData{
		return {
			pathname: this.pathname,
			history: this.#previousSearchParams.map(e => ({...e})),
			current: this.#currentSearchParams,
			
		}
	}

	onNotification(data: WindowLocationData){
		if(data.pathname != this.pathname){
			return;
		}

		const index = this.#previousSearchParams.findLastIndex((e: IndexedSearchParam) => e.value === data.search);


		if(index < 0){//new

			this.#pushToPreviousSearchParams(data.search);
			this.#setCurrentSearchParam();
		
			const eventData = this.#getEventData();

			this.notify(eventData);

		} else if( ItWasCreatedByUserNotNavigated ){ //new

		} else { //navigated

			
		}



		const eventData = JSON.parse(
			JSON.stringify(
				data
			)
		);
		
		this.notify(eventData);
	}
}
