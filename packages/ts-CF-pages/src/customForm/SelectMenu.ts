import type { 
	IndexedSelectOption,
	QueryParamCompatible_Form_Selection
} from '@tsLF/types';

import type { PositiveInteger } from '@tsL/types';

import { capitalizeWord } from '@tsCF/pages/src/index.ts';

import { U } from '@tsL/utils';

import type { Listener_ofGlobalMouseEvent_Click } from '@tsLF/mouseEventObservable';





export type Arguments_makeIndexedSelectOptionsFromQPCFormSelection = {
	objWithTypeOptions: QueryParamCompatible_Form_Selection,
	doUNeedSetSelected?: PositiveInteger<number> | 0 | string,
	doUNeedDefaultNonValue?: true,
	stringDecorationFn: (arg: string) => string
};

export const makeIndexedSelectOptionsFromQPCFormSelection = (
	{	
		objWithTypeOptions, 
		doUNeedSetSelected, 
		doUNeedDefaultNonValue,
		stringDecorationFn = str => str
	} : Arguments_makeIndexedSelectOptionsFromQPCFormSelection
): IndexedSelectOption[] => {

	const makeIndexedSelectOption = (
		id: PositiveInteger<number> | 0,
		param: string,
		value: string,
		name?: string,
		default_?: true,
	): IndexedSelectOption => {
		const obj: IndexedSelectOption = {
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


	const resultArr: IndexedSelectOption[] = [];

	if(doUNeedDefaultNonValue){
		const res = makeIndexedSelectOption(
			resultArr.length,
			objWithTypeOptions.name,
			objWithTypeOptions.name,
			stringDecorationFn(objWithTypeOptions.name),
			true
		);

		resultArr.push(res);
	}

	
	for(const option of objWithTypeOptions.options){
		const res = makeIndexedSelectOption(
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
			const index = resultArr.findIndex((e: IndexedSelectOption) => e.value === doUNeedSetSelected);

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
	QPCFormSelection?: QueryParamCompatible_Form_Selection,
	setSelected?: IndexedSelectOption | string | PositiveInteger<number> | 0,
	doUNeedDefaultNonValue?: true,
	stringDecorationFn?: (arg: string) => string,
	readyOptions?: IndexedSelectOption[],
}


export class SelectMenu implements Listener_ofGlobalMouseEvent_Click{
	private isActive: boolean = false;
	private options: IndexedSelectOption[];
	private selected: IndexedSelectOption | undefined;

	private initHTMLElement?: any;
	private parentHTMLElement?: any;
	readonly HTMLElement_globalAttribute_id: string;

	private externalSetActive: undefined | (() => void);
	private externalSetOptions: undefined | (() => void);
	private externalSetSelected: undefined | (() => void);


	constructor(
		{
			QPCFormSelection,
			setSelected,  
			doUNeedDefaultNonValue,
			stringDecorationFn = capitalizeWord,  
			readyOptions,
		} : ConstructorArguments_SelectMenu
	){

		if(QPCFormSelection){
			const args: Arguments_makeIndexedSelectOptionsFromQPCFormSelection = {
				objWithTypeOptions: QPCFormSelection,
				doUNeedDefaultNonValue,
				stringDecorationFn,
			};

			if(typeof setSelected != 'object'){
				args.doUNeedSetSelected = setSelected;
			}

			this.options = makeIndexedSelectOptionsFromQPCFormSelection(args);

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
			throw new Error('SelectMenu must have QueryParamCompatible_Form_Selection data value or ready IndexedSelectOption array as argument.');
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

		this.externalSetActive();
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
		if(!this.parentHTMLElement){
			this.parentHTMLElement = e.target.closest('#' + this.HTMLElement_globalAttribute_id);
		}

		if(!this.parentHTMLElement.isSameNode(e.target.closest('#' + this.HTMLElement_globalAttribute_id))){
			return;
		}

		this.#toggleActive();
	}
	
	private sortOptionSequence():void{
		const options = structuredClone(this.options);

		const indexOfSelected = options.findIndex(e => e.selected);
		let indexOfDefault = options.findIndex(e => e.default);

		let newArr: IndexedSelectOption[] = [];

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

		this.externalSetOptions();
	}

	select(option: IndexedSelectOption): void{
		const index = this.options.findIndex(e => e.id === option.id);

		if(index < 0){
			throw new Error(`WTF IS THIS??? WHO TOOK A SHIT IN CODE? HM??? I WILL FIND YOU, BITCH!`);
		}


		let options = structuredClone(this.options);
		
		options = options.map(e => (delete e.selected, e));
		
		options[index].selected = true;

		this.selected = structuredClone(options[index]);

		this.externalSetSelected();

		this.options = options;


		this.sortOptionSequence();
	}

	setBridgeToExternalScope(
		{
			active,
			options,
			selected
		} : {
			active: (a: boolean) => void,
			options: (a: IndexedSelectOption[]) => void,
			selected: (a: IndexedSelectOption) => void;
		}
	){
		//oxxxxxy, remake this later, please...

		this.externalSetActive = () => active(this.isActive);
		this.externalSetActive();

		this.externalSetOptions = () => options(structuredClone(this.options));
		this.externalSetOptions();

		this.externalSetSelected = () => selected(structuredClone(this.selected));
		this.externalSetSelected();
	}
}
