export type UnknownFunc = () => unknown;

export class ActionExecuterAfterCondition{
	#ready: boolean = false;
	#actions: UnknownFunc[] = [];

	constructor(fns?: UnknownFunc[]){
		if(fns){
			this.#actions.push(...fns);
		}
	}

	setReady(){
		this.#ready = true;
	}

	addAction(fn: UnknownFunc){
		const found = this.#findAction(fn);

		if(found.length){
			throw new Error('Action already exists.');			
		}

		this.#actions.push(fn);
	}

	#findAction(fn: UnknownFunc): number[]{
		const stringFn = fn.toString();

		return this.#actions.reduce(
			(ac: number[], e, i) => {
				const str = e.toString();
				
				if(str === stringFn){
					ac.push(i);
				}

				return ac;
			}
			,[]
		);
	}

	removeAction(fn: UnknownFunc): UnknownFunc | void {
		const found = this.#findAction(fn);
		
		if(found.length){
			return this.#actions.splice(found[0], 1)[0];
		}
	}

	exec(){
		if(!this.#ready){
			return;
		}

		for(const a of this.#actions){
			a();
		}
	}
}
