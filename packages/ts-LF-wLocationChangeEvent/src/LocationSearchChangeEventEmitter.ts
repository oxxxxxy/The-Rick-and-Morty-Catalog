import {
	Observable,
	Observer,
	ArgumentsFor_Observable
} from '@tsL/patterns';


import { WindowLocationData } from './index.ts';




export type LocationSearchChangeEventEmitter_Pathname = {
	pathname: string;
};

export type ArgumentsFor_LocationSearchChangeEventEmitter = ArgumentsFor_Observable
& LocationSearchChangeEventEmitter_Pathname;

export type IndexedSearchParam = {
	value: string;
	id: number;
};

export type LocationSearchChangeEventEmitter_MoveDirectionValues = 'back' | 'forward' | 'forward; new' | 'no move; the same value';

export type LocationSearchChangeEventData = LocationSearchChangeEventEmitter_Pathname
& {
	history: IndexedSearchParam[];
	current: IndexedSearchParam;
	direction: LocationSearchChangeEventEmitter_MoveDirectionValues;
};

export class LocationSearchChangeEventEmitter extends Observable implements Observer{
	readonly pathname: string;
	#previousSearchParams: IndexedSearchParam[] = [];
	#currentSearchParams: IndexedSearchParam | undefined;
	#currentMoveDirection: LocationSearchChangeEventEmitter_MoveDirectionValues | undefined;
	

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

	#getEventData(): LocationSearchChangeEventData {
		const eventData = {
			pathname: this.pathname,
			history: this.#previousSearchParams,
			current: this.#currentSearchParams,
			moveDir: this.#currentMoveDirection,
		};

		return JSON.parse(
			JSON.stringify(
				eventData
			)
		);
	}

	#setMoveDirection(dir?: 'n' | 'f' | 'b'){
		let text: LocationSearchChangeEventEmitter_MoveDirectionValues | undefined;

		switch(dir){
			case 'b':
				text = 'back';
				break;
			case 'f':
				text = 'forward';
				break;
			case 'n':
				text = 'forward; new';
				break;
			default:
				text = 'no move; the same value';
		}

		this.#currentMoveDirection = text;
	}

	onNotification(data: WindowLocationData){
		if(data.pathname != this.pathname){
			return;
		}

		const index = this.#previousSearchParams.findLastIndex((e: IndexedSearchParam) => e.value === data.search);


		if(index < 0){//new
			//if currentSearchParams == last previousSearchParams arr
			this.#pushToPreviousSearchParams(data.search);
			this.#setCurrentSearchParam();
			this.#setMoveDirection('n');
			//else
			//  slice previousSearchParams arr from currentSearchParams + 1
			//	
			//


			this.notify(this.#getEventData());

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
