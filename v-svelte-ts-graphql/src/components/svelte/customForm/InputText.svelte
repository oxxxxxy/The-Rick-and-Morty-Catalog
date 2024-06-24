<script lang="ts">
	import type { CFIDC_InputText_Base } from '@tsLF/pages';
	import { InputTextStrategy } from '@tsLF/pages';

	import type { QPC_InputText } from '@tsLF/forURLSP';
	
	
	import InputTextClearIcon from '$comps/svelte/customForm/icons/InputTextClearIcon.svelte';




	export let exitValue: QPC_InputText;
	export let CFIDC_InputText_initDataValue: CFIDC_InputText_Base;


	if(!CFIDC_InputText_initDataValue){
		throw new Error(`CFIDC_InputText_initDataValue must be passed.`);
	}


	let placeholder: string = '';
	let warning: string = '';


	const set_value = (v: QPC_InputText) => (exitValue = v);
	const set_warning = (w: string) => (warning = w);
	const set_placeholder = (p: string) => (placeholder = p);


	const _class = InputTextStrategy(CFIDC_InputText_initDataValue);

	const inputText = new _class(
		{
			initData: CFIDC_InputText_initDataValue,

			set_value,
			set_placeholder,
			set_warning
		}
	)


	$: _warning = warning;
	$: _value = '';
	$:{
			inputText.setValue(_value);
		}


	const clear = () => (
		_value = '',
		_warning = '',
		inputText.clear()
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
