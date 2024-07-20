import {
	Observable,
	Observer,
	ArgumentsFor_Observer_onNotification
} from '@tsL/patterns';




export type ArgumentsFor_LocationSearchChangeEventEmitter = {
	pathname: string;
};

export class LocationSearchChangeEventEmitter extends Observable implements Observer{
	readonly pathname: string;


	constructor(
		{
			pathname,
		} : ArgumentsFor_LocationSearchChangeEventEmitter
	){
		super();
		
		this.pathname = pathname;


	}

	onNotification(data?: ArgumentsFor_Observer_onNotification){

		return;
	}
}


