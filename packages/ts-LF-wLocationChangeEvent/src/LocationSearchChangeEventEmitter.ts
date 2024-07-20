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





		const eventData = JSON.parse(
			JSON.stringify(
				data
			)
		);
		
		this.notify(eventData);
	}
}
