export class SimpleAbortControllerExpandedEd{
	#kakashkaVPope: AbortController | undefined;
	#isPluggedIn: boolean = false;


	on(){
		this.#isPluggedIn = true;
	}
	
	off(){
		this.#isPluggedIn = false;
	}
	
	new(): AbortController | void {
		if(this.#isPluggedIn){
			return this.#kakashkaVPope = new AbortController();
		}
	}

	abort(){
		const check = this.#kakashkaVPope;

		if(!!check){
			check.abort();
		}
	}
}
