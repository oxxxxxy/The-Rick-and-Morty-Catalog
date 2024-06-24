<script lang="ts">
	import InputTextClearIcon from '$comps/svelte/customForm/icons/InputTextClearIcon.svelte';

//dev

	import type { 
		CFIDC_InputText_String,
		CFIDC_InputText_ExactString,
		CustomFormInitDataCompatible_String
	} from '@tsLF/pages';
	import {
		API_CHARACTERS__PARAM__NAME,
		API_EPISODES__PARAM__EPISODE
	} from '@tsCF/data';
	import type { QPC_InputText } from '@tsLF/forURLSP';

	import { makeInputText_defaultPlaceholder } from '@tsLF/pages';

/* function a (cd: CFIDC_InputText_String | CFIDC_InputText_ExactString | CFIDC_Types_InputText): QueryParamCompatible_Base {
	if(cd?.match){

	} else {

	}
} */

	/* const setBridgeToExternalScope = (
		{
			set_value,
			set_placeholder,
			set_warning
		} : {
			set_value: (v: QueryParamCompatible_Base) => void;
			set_warning?: (w: string) => void;
			set_placeholder: (p: string) => void;
		}
	){

	}; */



	export abstract class InputText {
		readonly value: QPC_InputText;

		readonly hint: string;
		readonly name: string;
		readonly type: string;

		readonly setExternalValue: (v?: QPC_InputText) => void;
		readonly setExternalPlaceholder: (p?: string) => void;


		constructor(
			{
				initData,

				stringDecorationFn = makeInputText_defaultPlaceholder,

				set_value,
				set_placeholder
			}: ArgumentsFor_InputText
		){
			this.type = initData.type;
			this.hint = initData.hint;
			this.name = initData.name;

			this.value = {
				param: initData.name,
				value: ''
			}
	

			this.setExternalPlaceholder = (p?: string) => set_placeholder(p || stringDecorationFn(this.name, this.hint));
			this.setExternalPlaceholder();

			this.setExternalValue = (v?: QPC_InputText) => set_value(structuredClone(v || this.value));

		}
		
		abstract clear(): void;
	
		abstract setValue(value: string): void;


	}

	type ArgumentsFor_InputText_ExactString = Arguments_for_InputText & {
		initData: CFIDC_InputText_ExactString;
		set_warning: (w: string) => void;
	};

	class InputText_ExactString extends InputText{

		readonly setExternalWarning: (w?: string) => void;

		constructor(
			{
				initData,

				stringDecorationFn = makeInputText_defaultPlaceholder,

				set_value,
				set_placeholder,
				set_warning
			}: ArgumentsFor_InputText_ExactString
		){
			super(
				{
					initData,

					stringDecorationFn,

					set_value,
					set_placeholder
				}
			);
		

			this.setExternalWarning = (w?: string) => set_warning(w || initData.warning);
		}
		
	}



	class InputText_String extends InputText{
		
		constructor(initData: CFIDC_InputText_String){
			super(initData);

		}


		clearValue(): void {
			
		}

		clear(): void {
		}
	}

	/* class InputTextFactory {
		

		constructor(CFIDC_IS: CFIDC_InputText_String| CFIDC_InputText_ExactString){
			if()
		}
	} */

//dev


	export let value: QPC_InputText;
	export let warning: string = '';
	export let CFIDC_InputText_String: CFIDC_InputText_String;


	let placeholder: string = '';

//dev
CFIDC_InputText_String = API_EPISODES__PARAM__EPISODE;
//dev

	const set_value = (v: QPC_InputText) => (value = v);
	const set_warning = (w: string) => (warning = w);
	const set_placeholder = (p: string) => (placeholder = p);

	if(!CFIDC_InputText_String){
		throw new Error(`CFIDC_InputText_String value must be passed.`);
	}


	$: _warning = warning;
	$: _value = '';
	$:{
			console.log(_value)
		}
	const clear = () => (
		_value = '',
		_warning = ''
	);
</script>

<div class="text-input-option d-flex w-100 fd-column"
>
	<div class="fd-row d-flex w-100">
	  <div class="text-input-box">
	    <div class="text-input-underline bg-color--282828"></div>
	    <input
	      class="text-input bg-color--b6b6b6 color--282828"
	      type="text"
	      placeholder="{placeholder}"
	      bind:value={_value}
	    />
	  </div>
		<button
		  class="ai-center jc-center text-input-clear fill--999999 bg-color--181a1b
			{!_value ? 'button--empty' : ''}
		  "
		  disabled="{!_value}"
		  on:click={clear}
		>
			<InputTextClearIcon />
		</button>
  </div>

  {#if warning}
 	 <div class="text-input-option d-flex w-100">
			<span class="text-input-warning w-100">
				{warning}
			</span>
		</div>
	{/if}

</div>
