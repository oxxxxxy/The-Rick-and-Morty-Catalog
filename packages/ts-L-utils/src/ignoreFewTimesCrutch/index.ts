import type { PositiveInteger } from '@tsL/types';




export class IgnoreFewTimesCrutch{
	readonly times: number;
	readonly ignores: number = 0;

	constructor(times: PositiveInteger<number>){
		this.times = times;
	}

	do(){
		this.ignores += 1;
	}

	isFinished(): boolean{
		return this.ignores > this.times;
	}
}
