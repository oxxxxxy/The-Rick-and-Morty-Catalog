import {
	Observable,
	ArgumentsFor_Observer_onNotification,
	ArgumentsFor_Observable
} from '@tsL/patterns';




export type WindowLocationData = ArgumentsFor_Observer_onNotification & {
	hash: string;
	host: string;
	hostname: string;
	href: string;
	origin: string;
	pathname: string;
	port: `${number}`;
	protocol: string;
	search: string; 
}

export class WindowLocationChangeEventEmitter extends Observable{
	#_interval: ReturnType<typeof setInterval>;
	#previous: string = '';
	#inited: boolean = false;

	constructor(
		{
			observers
		} : ArgumentsFor_Observable
	){
		super({observers});

		const T = this;


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
					const data: WindowLocationData = JSON.parse(
						JSON.stringify(
							window.location
						)
					);

					T.notify(data);

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
