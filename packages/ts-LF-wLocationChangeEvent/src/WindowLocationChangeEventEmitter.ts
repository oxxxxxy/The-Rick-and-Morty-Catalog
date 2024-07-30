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
	#inited: boolean = false;

	constructor(
		{
			observers
		} : ArgumentsFor_Observable
	){
		super({observers});

		const T = this;


		const notifyData = (data?: WindowLocationData) => {
			if(!data){
				data = JSON.parse(
					JSON.stringify(
						window.location
					)
				);
			}

			T.notify(data);
		};
		
		const interval = setInterval(
			() => {
				if(T.#inited){
					clearInterval(interval);
					
					return;
				}

				try{
					window.addEventListener(
						"popstate",
						(e) => {

							notifyData(
								JSON.parse(
									JSON.stringify(
										e.target.location
									)
								)
							);

						}
					);

					T.#inited = true;

					notifyData();
				} catch (e){
					return;
				}
			}
		);
	}
}
