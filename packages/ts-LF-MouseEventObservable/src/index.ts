export interface Listener_ofGlobalMouseEvent_Click {
	listenGlobalMouseEvent_Click: (e: any) => void
}	


export type Listener = Listener_ofGlobalMouseEvent_Click;


export type HolderOfListeners = {
	click?: Listener_ofGlobalMouseEvent_Click[];
};


export type EventTypeArg = keyof HolderOfListeners;


export class MouseEventObservable {

	private listerners: HolderOfListeners = {};

	constructor(){
		//idk
		console.log('puk...');
	}

	#addEventListener(eventType: EventTypeArg){
		console.log(eventType)
		window.addEventListener(eventType, (e) => this[eventType](e) );
	}

	attachListener(eventType: EventTypeArg, listener: Listener | Listener[], ...args: Listener[]){
		const arr: Listener[]	= [];

		if(Array.isArray(listener)){
			arr.push(...listener);
		} else {
			arr.push(listener);
		}

		if(Array.isArray(args)){
			arr.push(...args);
		}
		
		if(!this.listerners[eventType]){
			this.listerners[eventType] = [];
			this.#addEventListener(eventType);
		}

		this.listerners[eventType].push(...arr);
	}


	click(e: any){
		console.log('PUK', e)
		this.listerners.click.forEach(
			(el: Listener_ofGlobalMouseEvent_Click) => 
				el.listenGlobalMouseEvent_Click(e)
		);
	}
}
