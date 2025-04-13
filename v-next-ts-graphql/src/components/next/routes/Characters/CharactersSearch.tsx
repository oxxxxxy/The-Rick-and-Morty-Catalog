import { useState, useRef } from 'react';


import {
	API_CHARACTERS__PARAM__STATUS,
	API_CHARACTERS__PARAM__GENDER,
	API_CHARACTERS__PARAM__NAME,
	API_CHARACTERS__PARAM__SPECIES,
	API_CHARACTERS__PARAM__TYPE,
	API_CHARACTERS__PARAM_LIST
} from '@tsCF/data';

import type { QueryParamCompatible_Base } from '@tsLF/forURLSP';

import { CustomFormHolder } from '@tsLF/pages';
import type { ArgumentsFor_CustomFormHolder } from '@tsLF/pages';

import { U } from '@tsL/utils';


import InputText from '@/components/next/customForm/InputText';
import SelectMenu from '@/components/next/customForm/SelectMenu';




export default function CharactersSearch(
	{
		init_cachedValues,
		update_values,
		get_exit_values
	}: {
		init_cachedValues: QueryParamCompatible_Base[];
		update_values: QueryParamCompatible_Base[];
		get_exit_values: (v: QueryParamCompatible_Base[]) => void;
	}
){

	const [isValid, setIsValid] = useState<boolean>(true);
	const [update_valuesJson, setUpdate_valuesJson] = useState<string>(JSON.stringify(update_values));
	const set_value = get_exit_values;
	const set_applyActivity = (v: boolean) => setIsValid(v);

	const [exitValueStore, setExitValueStore] = useState<ValueStore>({});
	const [entryValueStore, setEntryValueStore] = useState<ValueStore>({});

	const customFormHolder = useRef<CustomFormHolder>();




	/* export let init_cachedValues: QueryParamCompatible_Base[];
	export let update_values: QueryParamCompatible_Base[];
	export let exit_values: QueryParamCompatible_Base[];


	let isValid: boolean = true;


	const set_value = (v: QueryParamCompatible_Base[]) => (exit_values = v);
	const set_applyActivity = (v: boolean) => (isValid = v);


	const CFIDCList = API_CHARACTERS__PARAM_LIST
	// [
	// 	API_CHARACTERS__PARAM__STATUS,
	// 	API_CHARACTERS__PARAM__GENDER,
	// 	API_CHARACTERS__PARAM__NAME,
	// 	API_CHARACTERS__PARAM__SPECIES,
	// 	API_CHARACTERS__PARAM__TYPE
	// ];

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

 */


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
