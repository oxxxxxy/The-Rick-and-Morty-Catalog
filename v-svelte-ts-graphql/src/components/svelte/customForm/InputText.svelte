<script lang="ts">
	import { onMount } from 'svelte';


	import type { CFIDC_InputText_Base } from '@tsLF/pages';
	import { CFIDCTypeBasedStrategyFn_InputText } from '@tsLF/pages';
	import type { InputText_ClassType_OneOf } from '@tsLF/pages';

	import type { QPC_InputText } from '@tsLF/forURLSP';

	import { U } from '@tsL/utils';
	
	
	import InputTextClearIcon from '$comps/svelte/customForm/icons/InputTextClearIcon.svelte';




	export let exit_value: QPC_InputText;
	export let entry_value: QPC_InputText;
	
	export let init_cachedValue: QPC_InputText;
	export let init_CFIDC_InputText: CFIDC_InputText_Base;

	export let init_instanceOfInputText: InputText_ClassType_OneOf;


	let placeholder: string = '';
	let warning: string = '';


	const set_value = (v: QPC_InputText) => (exit_value = v);
	const set_warning = (w: string) => (warning = w);
	const set_placeholder = (p: string) => (placeholder = p);


	let inputText;
	
	if(init_instanceOfInputText){
		init_instanceOfInputText.setBridgeToExternalScope(
			{
				set_warning,
				set_placeholder,
				set_value
			}
		)
	
		inputText = init_instanceOfInputText;

		const value = inputText.getValue();

		if(value.value){
			init_cachedValue = value;
		}
	} else {
		if(!init_CFIDC_InputText){
			throw new Error(`init_CFIDC_InputText must be passed.`);
		}

		if(init_cachedValue){
			if(init_cachedValue.param != init_CFIDC_InputText.name){
				throw new Error(`Value of the init_cachedValue.param is not equal to init_CFIDC_InputText.name. Check passed args. ` + JSON.stringify(init_cachedValue));
			}
		}

		const _class = CFIDCTypeBasedStrategyFn_InputText(init_CFIDC_InputText);

		inputText = new _class(
			{
				initData: init_CFIDC_InputText,

				set_value,
				set_placeholder,
				set_warning
			}
		);
	}

	const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();
	actionExecuterAfterMount.addAction(
		() => {
			_value = entry_value.value;
			inputText.setValue(_value);
			warning = warning; // bcz i don't trust svelte magic...
		}
	);


	//$: _warning = warning; not work anymore...
	$: _value = '';
	$:{
			inputText.setValue(_value);

			warning = warning; // bcz i don't trust svelte magic...
		}
	$:{
		entry_value = entry_value;
		
		actionExecuterAfterMount.exec();
	}



	const clear = () => (
		_value = '',
		inputText.clear()
	);


	onMount(() => {
		actionExecuterAfterMount.setReady();

		if(init_cachedValue){
			_value = init_cachedValue.value;
		}

	});
	
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
			{!_value ? 'button--empty' : 'button--has-some'}
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
