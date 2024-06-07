import { ErrorBase } from './error.base.js';

export class HTTPError extends ErrorBase{
	constructor(...e){
		super(...e);

		this.isOperational = true;
		this.type = 'HTTP';
	}
}

export class ProgDesignError extends ErrorBase{
	constructor(...e){
		super(...e);

		this.type = 'ProgDesign';
	}
}
