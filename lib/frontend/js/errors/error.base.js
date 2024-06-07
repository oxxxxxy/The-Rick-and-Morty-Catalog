export class ErrorBase extends Error{
	isOperational = false;
	type = 'ErrorBase';

	constructor(...e){
		super(...e);

		this.message = e[0];
	}
}

