import { FP } from './global-lib-exit.js';

export const get__server_status_icon_OKorERR = boolean => 
	boolean 
	? 'server-status-icon_OK' 
	: 'server-status-icon_ERR'
;

export const recognizeHTTPStatusFor__server_status_icon = status => status === 200 ? true : false;

export const handleStatus = FP.pipe(
	recognizeHTTPStatusFor__server_status_icon,
	get__server_status_icon_OKorERR
);


/* export class ExternalServerStatusChecker {
	#checkRequest;
	#status;
	#interval;
	#handleStatus;

	constructor({
		checkRequest,
		handleStatus
	}){
		this.#checkRequest = checkRequest; // fint ushami
		this.#handleStatus = handleStatus;
	}

	async do(){
		this.#status = await this.#checkRequest();

		return this.#status;
	}

	setInterval({
		setHandledResultToExternalVar, // OKorERR => (externalCompositionVar_serverStatusIconOkOrErr = OKorERR)
		ms = 30000
	}){
		const T = this;

		T.#interval = setInterval(
			async () => {
				const status = await T.do();

				const handledRes = T.#handleStatus(status);

				setHandledResultToExternalVar(handledRes);
			},
			ms
		);
	}

	clearInterval(){
		clearInterval(this.#interval);
	}
} */
