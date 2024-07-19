import type { LooseObject } from '@tsL/types';




export type ArgumentsFor_Observer_onNotification = LooseObject;


export abstract class Observer{
	
	abstract onNotification(data?: ArgumentsFor_Observer_onNotification): unknown;
}


export abstract class Observable{
	protected readonly observers: Observer[] = [];

	protected notify(data?: ArgumentsFor_Observer_onNotification){
		if(!data){
			for(const o of this.observers){
				o.onNotification();
			}

			return;
		}

		for(const o of this.observers){
			o.onNotification({...data});
		}
	}

	protected attach(observer: Observer){
		this.observers.push(observer);
	}
}
