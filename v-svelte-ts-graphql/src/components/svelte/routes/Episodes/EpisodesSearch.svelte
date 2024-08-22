<script lang="ts">
	import { onMount } from 'svelte';


	import {
		API_EPISODES__PARAM__EPISODE,
		API_EPISODES__PARAM__NAME,
		API_EPISODES__PARAM_LIST
	} from '@tsCF/data';

	import type { QueryParamCompatible_Base } from '@tsLF/forURLSP';

	import { CustomFormHolder } from '@tsLF/pages';
	import type { ArgumentsFor_CustomFormHolder } from '@tsLF/pages';

	import { U } from '@tsL/utils';


	import InputText from '$comps/svelte/customForm/InputText.svelte';




	export let init_cachedValues: QueryParamCompatible_Base[];
	export let update_values: QueryParamCompatible_Base[];
	export let exit_values: QueryParamCompatible_Base[];


	let isValid: boolean = true;


	const set_value = (v: QueryParamCompatible_Base[]) => (exit_values = v);
	const set_applyActivity = (v: boolean) => (isValid = v);


	const CFIDCList = API_EPISODES__PARAM_LIST;

	const args: ArgumentsFor_CustomFormHolder = {
		set_value,
		set_applyActivity,

		CFIDCList: CFIDCList
	};

	if(init_cachedValues){
		args.cachedQPCValues = init_cachedValues;
	}

	const customFormHolder = new CustomFormHolder(args);
	
	const exitValueStore = CustomFormHolder.makeValueStore(CFIDCList);
	let entryValueStore = CustomFormHolder.makeValueStore(CFIDCList);

	const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();
	actionExecuterAfterMount.addAction(
		() => {
			const storeValue = CustomFormHolder.makeValueStore(CFIDCList);
			
			CustomFormHolder.setValuesToValueStore(storeValue, update_values);

			entryValueStore = storeValue;

		}
	);


	$: enabledDisabled = isValid ? {enabled: true} : {disabled: true};
	$:{
		customFormHolder.recieveExitValueStore(exitValueStore);

		isValid = isValid;
	}
	$:{
		actionExecuterAfterMount.exec();
	
		//svelte magic again. WTF?
		update_values = update_values;
		entryValueStore = entryValueStore;
	}


	onMount(() => {
		actionExecuterAfterMount.setReady();
		
	})

</script>

<div class="margin-10 w-100 d-flex jc-center">
  <div
    class="search--width d-flex jc-space-between fd-column"
    title="characters"
  >

		<InputText
			bind:exit_value = {
				exitValueStore[
					API_EPISODES__PARAM__NAME
					.name
				]
			}
			bind:entry_value = {
				entryValueStore[
					API_EPISODES__PARAM__NAME
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_EPISODES__PARAM__NAME
				)
			}
		/>
		<InputText
			bind:exit_value = {
				exitValueStore[
					API_EPISODES__PARAM__EPISODE
					.name
				]
			}
			bind:entry_value = {
				entryValueStore[
					API_EPISODES__PARAM__EPISODE
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_EPISODES__PARAM__EPISODE
				)
			}
		/>

    <div class="filter-select-box d-flex jc-center ai-center">


    </div>

    <button
      class="
				filter-button color--b6b6b6 bg-color--181a1b tt-uppercase 
				{ isValid ? 'button--has-some': 'button--empty'}
			"

			{...enabledDisabled}

		  on:click={() => customFormHolder.apply()}
    >
      Apply
    </button>
  </div>
</div>
