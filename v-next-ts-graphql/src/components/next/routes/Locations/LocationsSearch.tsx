import { useState } from 'react';


import {
	API_LOCATIONS__PARAM__NAME,
	API_LOCATIONS__PARAM__DIMENSION,
	API_LOCATIONS__PARAM__TYPE,
	API_LOCATIONS__PARAM_LIST
} from '@tsCF/data';

import type { 
	QueryParamCompatible_Base,
	QPC_InputText
} from '@tsLF/forURLSP';

import { CustomFormHolder } from '@tsLF/pages';
import type { ArgumentsFor_CustomFormHolder } from '@tsLF/pages';

import { U } from '@tsL/utils';


import InputText from '@/components/next/customForm/InputText';




export default function LocationsSearch(
	{
		init_cachedValues,
		update_values,
		get_exitValue
	}:{
		init_cachedValues: QueryParamCompatible_Base[];
		update_values: QueryParamCompatible_Base[];
		get_exitValue: (v: QueryParamCompatible_Base[]) => void;
	}
){
// export let init_cachedValues: QueryParamCompatible_Base[];
// export let update_values: QueryParamCompatible_Base[];
	// export let exit_values: QueryParamCompatible_Base[];
	
	
	// let isValid: boolean = true;
	const [isValid, setIsValid] = useState<boolean>(true);
	
	const set_value = get_exitValue;
	// const set_value = (v: QueryParamCompatible_Base[]) => (exit_values = v);
	const set_applyActivity = (v: boolean) => setIsValid(v);
	const [exitValueStore, setExitValueStore] = useState({});
	const [entryValueStore, setEntryValueStore] = useState({});

	const [get_exitValue__param_name, setFnGet_exitValue__param_name] = useState(()=>()=>{});

	const [customFormHolder, setCFH] = useState(
		() => {

			const CFIDCList = API_LOCATIONS__PARAM_LIST;
			
			const args: ArgumentsFor_CustomFormHolder = {
				set_value,
				set_applyActivity,
			
				CFIDCList: CFIDCList
			};
			
			if(init_cachedValues){
				args.cachedQPCValues = init_cachedValues;
			} 

			const customFormHolder = new CustomFormHolder(args);
			
			// const exitValueStore = CustomFormHolder.makeValueStore(CFIDCList);
			setExitValueStore(CustomFormHolder.makeValueStore(CFIDCList));
			// let entryValueStore = CustomFormHolder.makeValueStore(CFIDCList);
			setEntryValueStore(CustomFormHolder.makeValueStore(CFIDCList));

			// const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();
			// actionExecuterAfterMount.addAction(
			// 	() => {
			// 		const storeValue = CustomFormHolder.makeValueStore(CFIDCList);
					
			// 		CustomFormHolder.setValuesToValueStore(storeValue, update_values);

			// 		entryValueStore = storeValue;

			// 	}
			// );
			//
			
			setFnGet_exitValue__param_name(
				() =>
				(v: QPC_InputText) => {
			exitValueStore[API_LOCATIONS__PARAM__NAME.name] = v;
			setExitValueStore(exitValueStore);
	customFormHolder.recieveExitValueStore(exitValueStore);

		setCFH(customFormHolder);
	console.log(v, API_LOCATIONS__PARAM__NAME.name, exitValueStore, customFormHolder.getExitValue(), 'pa')
			
				}
			);
			
			return customFormHolder;
		}
	);


	console.log(get_exitValue__param_name)

	const enabledDisabled = isValid ? {enabled: true} : {disabled: true};
	// $:{
	// 	customFormHolder.recieveExitValueStore(exitValueStore);

	// 	isValid = isValid;
	// }
	// $:{
	// 	actionExecuterAfterMount.exec();
	
	// 	//svelte magic again. WTF?
	// 	update_values = update_values;
	// 	entryValueStore = entryValueStore;
	// }


	// onMount(() => {
	// 	actionExecuterAfterMount.setReady();
		
	// })

	


	return (
<div className="margin-10 w-100 d-flex jc-center">
  <div
    className="search--width d-flex jc-space-between fd-column"
    title="characters"
  >

		<InputText
			get_exitValue = {
				// exitValueStore[
				// 	API_LOCATIONS__PARAM__NAME
				// 	.name
				// ]
				get_exitValue__param_name
			}
			entry_value = {
				entryValueStore[
					API_LOCATIONS__PARAM__NAME
					.name
				]
				// ({param: 'name', value: '123'})
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_LOCATIONS__PARAM__NAME
				)
			}
		/>
				{/*
		<InputText
			bind:exit_value = {
				exitValueStore[
					API_LOCATIONS__PARAM__TYPE
					.name
				]
			}
			bind:entry_value = {
				entryValueStore[
					API_LOCATIONS__PARAM__TYPE
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_LOCATIONS__PARAM__TYPE
				)
			}
		/>
		<InputText
			bind:exit_value = {
				exitValueStore[
					API_LOCATIONS__PARAM__DIMENSION
					.name
				]
			}
			bind:entry_value = {
				entryValueStore[
					API_LOCATIONS__PARAM__DIMENSION
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_LOCATIONS__PARAM__DIMENSION
				)
			}
		/>

		*/}

    <div className="filter-select-box d-flex jc-center ai-center">


    </div>

    <button
      className="
				filter-button color--b6b6b6 bg-color--181a1b tt-uppercase 
				{ isValid ? 'button--has-some': 'button--empty'}
			"

			{...enabledDisabled}

		  onClick={() => (customFormHolder.apply())}
    >
      Apply
    </button>
  </div>
</div>
	);
}
