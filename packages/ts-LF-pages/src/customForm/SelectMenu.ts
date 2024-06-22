import type { QPC_IndexedSelectOption } from '@tsLF/forURLSP';

import type { CFIDC_Selection } from './types';

import type { PositiveInteger } from '@tsL/types';

import type { Listener_ofGlobalMouseEvent_Click } from '@tsLF/mouseEventObservable';

import { capitalizeWord } from '@tsLF/pages';

import { U } from '@tsL/utils';




export type Arguments_makeQPC_IndexedSelectOptionsFromCFIDC_Selection = {
	objWithTypeOptions: CFIDC_Selection,
	doUNeedSetSelected?: PositiveInteger<number> | 0 | string,
	doUNeedDefaultNonValue?: true,
	stringDecorationFn: (arg: string) => string
};

export const makeQPC_IndexedSelectOptionsFromCFIDC_Selection = (
	{	
		objWithTypeOptions, 
		doUNeedSetSelected, 
		doUNeedDefaultNonValue,
		stringDecorationFn = str => str
	} : Arguments_makeQPC_IndexedSelectOptionsFromCFIDC_Selection
): QPC_IndexedSelectOption[] => {

	const makeQPC_IndexedSelectOption = (
		id: PositiveInteger<number> | 0,
		param: string,
		value: string,
		name?: string,
		default_?: true,
	): QPC_IndexedSelectOption => {
		const obj: QPC_IndexedSelectOption = {
			id,
			value,
			param
		};

		if(default_){
			obj.default = default_;
		}

		if(name){
			obj.name = name;
		}

		return obj;
	};


	const resultArr: QPC_IndexedSelectOption[] = [];

	if(doUNeedDefaultNonValue){
		const res = makeQPC_IndexedSelectOption(
			resultArr.length,
			objWithTypeOptions.name,
			objWithTypeOptions.name,
			stringDecorationFn(objWithTypeOptions.name),
			true
		);

		resultArr.push(res);
	}

	
	for(const option of objWithTypeOptions.options){
		const res = makeQPC_IndexedSelectOption(
			resultArr.length,
			objWithTypeOptions.name,
			option,
			stringDecorationFn(option)
		);

		resultArr.push(res);
	}


	if(doUNeedSetSelected){
		if(typeof doUNeedSetSelected === 'number'){
			if(doUNeedSetSelected >= resultArr.length){
				throw new Error(`doUNeedSetSelected number value "${doUNeedSetSelected}" (>= ${resultArr.length}) is equal to or more than resultArr length "${resultArr.length}".`);
			}

			resultArr[doUNeedSetSelected].selected = true;
		} else if( typeof doUNeedSetSelected === 'string' ){
			const index = resultArr.findIndex((e: QPC_IndexedSelectOption) => e.value === doUNeedSetSelected);

			if(index < 0){
				throw new Error(`doUNeedSetSelected string value "${doUNeedSetSelected}" does not exist in options of the "${objWithTypeOptions.name}".`);
			}
				
			resultArr[index].selected = true;
		}
	}


	if(!resultArr.length){
		throw new Error('resultArr is empty.');
	}


	return resultArr;
};


export type ConstructorArguments_SelectMenu = {
	CFIDC_Selection?: CFIDC_Selection,
	setSelected?: QPC_IndexedSelectOption | string | PositiveInteger<number> | 0,
	doUNeedDefaultNonValue?: true,
	stringDecorationFn?: (arg: string) => string,
	readyOptions?: QPC_IndexedSelectOption[],
}


export class SelectMenu implements Listener_ofGlobalMouseEvent_Click{
	private isActive: boolean = false;
	private options: QPC_IndexedSelectOption[];
	private selected: QPC_IndexedSelectOption | undefined;

	#guardingIsNoLongerNeeded: boolean = false;
	private parentHTMLElement?: any;
	readonly HTMLElement_globalAttribute_id: string;

	#externalSetActive: undefined | (() => void);
	#externalSetOptions: undefined | (() => void);
	#externalSetSelected: undefined | (() => void);


	constructor(
		{
			CFIDC_Selection,
			setSelected,  
			doUNeedDefaultNonValue,
			stringDecorationFn = capitalizeWord,  
			readyOptions,
		} : ConstructorArguments_SelectMenu
	){

		if(CFIDC_Selection){
			const args: Arguments_makeQPC_IndexedSelectOptionsFromCFIDC_Selection = {
				objWithTypeOptions: CFIDC_Selection,
				doUNeedDefaultNonValue,
				stringDecorationFn,
			};

			if(typeof setSelected != 'object'){
				args.doUNeedSetSelected = setSelected;
			}

			this.options = makeQPC_IndexedSelectOptionsFromCFIDC_Selection(args);

		} else if(readyOptions){
			/* const cache = {};

			for(const rOp1 of readyOptions){
				const string = JSON.stringify(rOp1);

				if(cache[string]){
					throw
				}
			} */

			//place for validation/guarding... it is not important right now.

			this.options = readyOptions;

		} else {
			throw new Error('SelectMenu must have CFIDC_Selection data value or ready QPC_IndexedSelectOption array as argument.');
		}


		if(typeof setSelected === 'object'){
			const index = this.options.findIndex(e => 
				(
					e.value === setSelected.value
					&& e.id === setSelected.id
				)
			);

			if(index < 0){
				throw new Error(`setSelected ${JSON.stringify(setSelected)} does not exist in ${JSON.stringify(this.options)}.`);
			}

			this.options[index].selected = true;
		}

		this.selected = structuredClone(this.options.find(e => e.selected));


		this.HTMLElement_globalAttribute_id = 'i' + U.nanoid();
	}
	
	#toggleActive(bool?: boolean){
		if(bool === undefined){
			this.isActive = !this.isActive;
		} else {
			this.isActive = bool;
		}

		this.#externalSetActive();
	}

	listenGlobalMouseEvent_Click(e: any){
		if(!this.parentHTMLElement || !this.isActive){
			return;
		}

		const target = e.target.closest('#' + this.HTMLElement_globalAttribute_id);

		if(target === null){
			this.#toggleActive(false);
		}
	}

	click(e: any): void{
		this.#guard();

		if(!this.parentHTMLElement){
			this.parentHTMLElement = e.target.closest('#' + this.HTMLElement_globalAttribute_id);
		}

		if(!this.parentHTMLElement.isSameNode(e.target.closest('#' + this.HTMLElement_globalAttribute_id))){
			return;
		}

		this.#toggleActive();
	}
	
	#sortOptionSequence():void{
		const options = structuredClone(this.options);

		const indexOfSelected = options.findIndex(e => e.selected);
		let indexOfDefault = options.findIndex(e => e.default);

		let newArr: QPC_IndexedSelectOption[] = [];

		if(indexOfSelected >= 0){
			newArr = options.splice(indexOfSelected, 1);

			if(indexOfDefault >= 0 && indexOfDefault != indexOfSelected){
				indexOfDefault = options.findIndex(e => e.default);

				newArr = newArr.concat(options.splice(indexOfDefault, 1));
			}
		}

		options.sort((a, b) => a.id - b.id);

		newArr = newArr.concat(options);

		this.options = newArr;

		this.#externalSetOptions();
	}

	select(option: QPC_IndexedSelectOption): void{
		this.#guard();

		let options = structuredClone(this.options);

		const index = options.findIndex(e => e.id === option.id);

		if(index < 0){
			throw new Error(`WTF IS THIS??? WHO TOOK A SHIT IN CODE? HM??? I WILL FIND YOU, BITCH!`);
		}
		
		options = options.map(e => (delete e.selected, e));
		
		options[index].selected = true;

		this.selected = structuredClone(options[index]);
		this.#externalSetSelected();

		this.options = options;

		this.#sortOptionSequence();
	}

	#guard(){
		const T = this;

		if(T.#guardingIsNoLongerNeeded){
			return;
		}

		if(!this.#externalSetActive){
			throw new Error('Set bridge to external scope. this.#externalSetActive is undefined...');
		}  

		if(!this.#externalSetOptions){
			throw new Error('Set bridge to external scope. this.#externalSetOptions is undefined...');
		}  

		if(!this.#externalSetSelected){
			throw new Error('Set bridge to external scope. this.#externalSetSelected is undefined...');
		}  


		T.#guardingIsNoLongerNeeded = true;
	}

	setBridgeToExternalScope(
		{
			active,
			options,
			selected
		} : {
			active: (a: boolean) => void,
			options: (a: QPC_IndexedSelectOption[]) => void,
			selected: (a: QPC_IndexedSelectOption) => void;
		}
	){
		this.#externalSetActive = () => active(this.isActive);
		this.#externalSetActive();

		this.#externalSetOptions = () => options(structuredClone(this.options));
		this.#externalSetOptions();

		this.#externalSetSelected = () => selected(structuredClone(this.selected));
		this.#externalSetSelected();
	}
}
