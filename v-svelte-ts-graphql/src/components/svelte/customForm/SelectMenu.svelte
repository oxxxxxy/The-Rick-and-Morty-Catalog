<script lang="ts">
	import type { IndexedSelectOption } from '@tsLF/types';


	import SelectMenuIcon from '$comps/svelte/customForm/icons/SelectMenuIcon.svelte';




	//dev
	import {
		API_CHARACTERS__PARAM__STATUS
	} from '@tsCF/data';
	
	import type {
		QueryParamCompatible_Form_Selection
	} from '@tsLF/types';
	import type { PositiveInteger } from '@tsL/types';
	
	import { capitalizeWord } from '@tsCF/pages/src/index.ts';

	import { makeIndexedSelectOptionsFromQPCFormSelection } from '@tsCF/pages/src/customForm/SelectMenu.ts'
	import type { Arguments_makeIndexedSelectOptionsFromQPCFormSelection } from '@tsCF/pages/src/customForm/SelectMenu.ts'


	import { U } from '@tsL/utils';



	//dev



	interface Listener_ofGlobalMouseEvent_Click {
		listenGlobalMouseEvent_Click: (e: any) => void
	}	

	type ConstructorArguments_SelectMenu = {
		QPCFormSelection?: QueryParamCompatible_Form_Selection,
		setSelected?: IndexedSelectOption | string | PositiveInteger<number> | 0,
		doUNeedDefaultNonValue?: true,
		stringDecorationFn?: (arg: string) => string,
		readyOptions?: IndexedSelectOption[],
		isActive?: boolean
	}

	class SelectMenu implements Listener_ofGlobalMouseEvent_Click{
		private isActive: boolean;
		private options: IndexedSelectOption[];
		private selected: IndexedSelectOption | undefined;

		private initHTMLElement?: any;
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
				isActive = false
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

			this.isActive = isActive;

			this.HTMLElement_globalAttribute_id = U.nanoid();
		}

		listenGlobalMouseEvent_Click(e: any){
			//think about how to throw event from another non this menu elements to hide menu...

			console.log(e.target.closest(this.HTMLElement_globalAttribute_id))

		}

		click(e: any): void{
			if(!this.initHTMLElement){
				this.initHTMLElement = e.target.closest('#' + this.HTMLElement_globalAttribute_id);
			}

			this.isActive = !this.isActive;
		
			this.externalSetActive();
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

		private select(option: IndexedSelectOption): void{
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

		clickSelect(option: IndexedSelectOption): void{
			this.isActive = false;

			this.externalSetActive();

			this.select(option);
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


	export let options: IndexedSelectOption[];
	export let selectMenuInstance: SelectMenu;
	export let QPCFormSelection: QueryParamCompatible_Form_Selection;
	export let selected: IndexedSelectOption | string | PositiveInteger<number> | 0;
	export let active: boolean = false;


	const set_active = (act: boolean) => (active = act);
	const set_options = (ops: IndexedSelectOption[]) => (options = ops);
	const set_selected = (sel: IndexedSelectOption) => (selected = sel);


	//delete
	QPCFormSelection = API_CHARACTERS__PARAM__STATUS;
	//me
	if(!selectMenuInstance){
		let args: ConstructorArguments_SelectMenu;

		if(options){
			args = {
				readyOptions: options
			};
		}else if(QPCFormSelection){
			args = {
				QPCFormSelection: QPCFormSelection
			};
		}else{
			throw new Error('SelectMenu must have QueryParamCompatible_Form_Selection data value or ready IndexedSelectOption array as argument.');
		}

		if(selected){
			args.setSelected = selected;
		}

		if(active){
			args.isActive = active;
		}
	
		args.doUNeedDefaultNonValue = true;

		selectMenuInstance = new SelectMenu(args);

		selectMenuInstance.setBridgeToExternalScope({
			active: set_active,
			selected: set_selected,
			options: set_options
		});
	}


	$: _active = active;
	$: _options = options;

</script>


<div
  class="
		select-list-box
		select-list-box--statusGender
	"
  style:overflow="{ _active ? 'visible' : 'hidden' }"
	on:click={(e) => selectMenuInstance.click(e)}
	id="{selectMenuInstance.HTMLElement_globalAttribute_id}"
>
  <div class="select-list bg-color--282828 d-flex fd-column">
		{#each _options as option, i }
			{#if i === 0}
	   	 <span
					class="
						select-list-option-border
						select-list-option
						{
							i === 0 
							? 'selected-select-list-option'
							: ''
						}
					"
				>
					{option.name}
				</span>
			{:else}
	   	 <span
					class="
						select-list-option-border
						select-list-option
						{
							i === _options.length - 1
							? 'select-list-option-border-last'
							: ''
						}
					"
					on:click={() => selectMenuInstance.clickSelect(option)}
				>
					{option.name}
				</span>
			{/if}
    {/each}
  </div>
  <div class="d-flex ai-center jc-center color--282828 select-list-icon">
		<SelectMenuIcon />
  </div>
</div>
