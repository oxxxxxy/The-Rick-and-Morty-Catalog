<script lang="ts">
	import { onMount } from 'svelte';


	import {
		API_CHARACTERS__PARAM__STATUS,
		API_CHARACTERS__PARAM__GENDER,
		API_CHARACTERS__PARAM__NAME,
		API_CHARACTERS__PARAM__SPECIES,
		API_CHARACTERS__PARAM__TYPE
	} from '@tsCF/data';

	import type { QueryParamCompatible_Base } from '@tsLF/forURLSP';

	import { CustomFormHolder } from '@tsLF/pages';
	import type { ArgumentsFor_CustomFormHolder } from '@tsLF/pages';

	import { U } from '@tsL/utils';


	import InputText from '$comps/svelte/customForm/InputText.svelte';
	import SelectMenu from '$comps/svelte/customForm/SelectMenu.svelte';




	export let init_cachedValues: QueryParamCompatible_Base[];
	export let navigation_values: QueryParamCompatible_Base[];
	export let exit_values: QueryParamCompatible_Base[];


	let isValid: boolean = true;


	const set_value = (v: QueryParamCompatible_Base[]) => (exit_values = v);
	const set_applyActivity = (v: boolean) => (isValid = v);


	const CFIDCList = [
		API_CHARACTERS__PARAM__STATUS,
		API_CHARACTERS__PARAM__GENDER,
		API_CHARACTERS__PARAM__NAME,
		API_CHARACTERS__PARAM__SPECIES,
		API_CHARACTERS__PARAM__TYPE
	];

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
			CustomFormHolder.setValuesToValueStore(entryValueStore, navigation_values);
			CustomFormHolder.clearNonExistentValuesFromValueStore(entryValueStore, navigation_values);
			console.log('CS.sv', entryValueStore, navigation_values)
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
		navigation_values = navigation_values;
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
					API_CHARACTERS__PARAM__NAME
					.name
				]
			}
			bind:entry_value = {
				entryValueStore[
					API_CHARACTERS__PARAM__NAME
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_CHARACTERS__PARAM__NAME
				)
			}
		/>
		<InputText
			bind:exit_value = {
				exitValueStore[
					API_CHARACTERS__PARAM__SPECIES
					.name
				]
			}
			bind:entry_value = {
				entryValueStore[
					API_CHARACTERS__PARAM__SPECIES
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_CHARACTERS__PARAM__SPECIES
				)
			}
		/>
		<InputText
			bind:exit_value = {
				exitValueStore[
					API_CHARACTERS__PARAM__TYPE
					.name
				]
			}
			bind:entry_value = {
				entryValueStore[
					API_CHARACTERS__PARAM__TYPE
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_CHARACTERS__PARAM__TYPE
				)
			}
		/>

    <div class="filter-select-box d-flex jc-center ai-center">

			<SelectMenu 
				bind:exit_value = {
					exitValueStore[
						API_CHARACTERS__PARAM__STATUS
						.name
					]
				}
				bind:entry_value = {
					entryValueStore[
						API_CHARACTERS__PARAM__STATUS
						.name
					]
				}
				init_instanceOfSelectMenu = {
					customFormHolder.getInstanceOfCFItemFor(
						API_CHARACTERS__PARAM__STATUS
					)
				}
			/>

      <div
        class="show-if-desktop-size"
        style="margin-left: 5px; height: 100%"
      ></div>

			<SelectMenu 
				bind:exit_value = {
					exitValueStore[
						API_CHARACTERS__PARAM__GENDER
						.name
					]
				}
				bind:entry_value = {
					entryValueStore[
						API_CHARACTERS__PARAM__GENDER
						.name
					]
				}
				init_instanceOfSelectMenu = {
					customFormHolder.getInstanceOfCFItemFor(
						API_CHARACTERS__PARAM__GENDER
					)
				}
			/>

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
