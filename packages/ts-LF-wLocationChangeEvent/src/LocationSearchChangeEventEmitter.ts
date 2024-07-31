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

export type LocationSearchChangeEventData = LocationSearchChangeEventEmitter_Pathname
& {
	searchParamsData: string;
	windowLocationData: WindowLocationData;
};

export class LocationSearchChangeEventEmitter extends Observable implements Observer{
	readonly pathname: string;


	constructor(
		{
			pathname,
			observers
		} : ArgumentsFor_LocationSearchChangeEventEmitter
	){
		super({observers});
		
		this.pathname = pathname;
	}

	onNotification(data: WindowLocationData){
		if(data.pathname != this.pathname){
			return;
		}

		if(!data.search){
			return;
		}
		
		const _data: LocationSearchChangeEventData = {
			pathname: this.pathname,
			searchParamsData: data.search,
			windowLocationData: data
		};

		const eventData = JSON.parse(
			JSON.stringify(
				_data
			)
		);

		this.notify(eventData);
	}
}
