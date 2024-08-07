export type UnknownFunc = () => unknown;
export type UnknownFuncWithArgs = (...args: any[]) => unknown;

export class ActionExecuterAfterCondition{
	#ready: boolean = false;
	#actions: UnknownFunc[] = [];
	#idActions: {[key: string]: UnknownFunc | UnknownFuncWithArgs} = {};

	constructor(fns?: UnknownFunc[]){
		if(fns){
			this.#actions.push(...fns);
		}
	}

	setReady(){
		this.#ready = true;
	}
	
	addIdAction(id: string, fn: UnknownFuncWithArgs | UnknownFunc){
		if(this.#idActions[id]){
			throw new Error('IdAction "' + id + '" already exists.');
		}

		this.#idActions[id] = fn;
	}

	execById(id: string, args?: any[]): unknown{
		if(!this.#ready){
			return;
		}

		if(!this.#idActions[id]){
			throw new Error('IdAction "' + id + '" does not exist.');
		}

		if(!args){
			args = [];
		}

		return this.#idActions[id](...args);
	}

	removeIdAction(id: string){
		delete this.#idActions[id];
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
