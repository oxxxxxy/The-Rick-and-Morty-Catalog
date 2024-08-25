export type ElementCauseValueObj = {
	cause: string;
	value: string | ((v: any) => string);
};

export type ArgumentsFor_LittleChangeableStringElementDrawer = {
	setElementValueFn: (v: string) => void;
	elementCauseValues: ElementCauseValueObj[];
};

export class LittleChangeableStringElementDrawer{
	readonly elementCauseValues: ElementCauseValueObj[];
	#setExternalElementValue: (v:string) => void;

	constructor(
		{
			setElementValueFn,
			elementCauseValues
		} : ArgumentsFor_LittleChangeableStringElementDrawer
	){
		this.elementCauseValues = elementCauseValues;
		this.#setExternalElementValue = setElementValueFn;
	}

	draw(cause: string, v?: any){
		const found = this.elementCauseValues.find(e => e.cause === cause);

		if(!found){
			throw new Error('Nothing found by cause: ' + cause);
		}

		let value;

		if(typeof found.value === 'function'){
			value = found.value(v);
		} else {
			value = found.value;
		}

		this.#setExternalElementValue(value);
	}
};
