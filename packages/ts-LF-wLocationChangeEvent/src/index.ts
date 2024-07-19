import {
	Observable,
	Observer
} from '@tsL/patterns';




export type ArgumentsFor_WindowLocationChangeEventEmitter = {
	observers?: Observer[];
};

export class WindowLocationChangeEventEmitter extends Observable{
	#_interval: ReturnType<typeof setInterval>;
	#previous: string = '';
	#inited: boolean = false;

	constructor(
		{
			observers
		} : ArgumentsFor_WindowLocationChangeEventEmitter
	){
		super();

		const T = this;

		
		if(observers){
			for(const o of observers){
				T.attach(o);
			}
		}


		T.#_interval = setInterval(
			() => {
				let href;

				try{
					href = window.location.href;
					T.#init();
				} catch (e){
					return;
				}

				if(href != T.#previous){
					T.notify(window.location);

					T.#previous = href;
				}
			}
		);
	}

	#init(){
		if(!this.#inited){
			this.#previous = window.location.href;
			
			this.#inited = true;
		}
	}

	clear(){
		clearInterval(this.#_interval);
	}
}
