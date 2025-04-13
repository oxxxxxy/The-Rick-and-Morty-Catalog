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
import type { 
	ArgumentsFor_CustomFormHolder,
	ValueStore,
	objWithFnsForEachCFIDC__get_exitValue
} from '@tsLF/pages';

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

	const REF_customFormHolder = useRef<CustomFormHolder>();


	const [objWithFnsForEachCFIDC__get_exitValue] = useState<objWithFnsForEachCFIDC__get_exitValue>(
		() => {
			const CFIDCList = API_CHARACTERS__PARAM_LIST;

			const args: ArgumentsFor_CustomFormHolder = {
				set_value,
				set_applyActivity,
			
				CFIDCList: CFIDCList
			};
			
			if(init_cachedValues){
				args.cachedQPCValues = init_cachedValues;
			} 
		
			REF_customFormHolder.current = new CustomFormHolder(args);
			
			setExitValueStore(CustomFormHolder.makeValueStore(CFIDCList));
			setEntryValueStore(CustomFormHolder.makeValueStore(CFIDCList));

			if(update_values.length){
				updateUpdate_values();
			}

			const objWithFnsForEachCFIDC__get_exitValue: objWithFnsForEachCFIDC__get_exitValue = {};
			
			for(const el of CFIDCList){
				objWithFnsForEachCFIDC__get_exitValue[el.name] = (v: QueryParamCompatible_Base) => {
					exitValueStore[el.name] = v;
					setExitValueStore(exitValueStore);
					// prosti menya, gospod'... no ya greshen...
					// @ts-ignore-next-line
					REF_customFormHolder.current.recieveExitValueStore(exitValueStore);
				}
			}
			
			return objWithFnsForEachCFIDC__get_exitValue;
		}
	);


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

	if(!REF_customFormHolder.current){
		throw new Error('OMG WE\'RE ALL GOING TO DIE!!!! Let\'s fuck in the asses, dudes.');
	}

	function updateUpdate_values(){
		const storeValue = CustomFormHolder.makeValueStore(API_CHARACTERS__PARAM_LIST);
		CustomFormHolder.setValuesToValueStore(storeValue, update_values);
		setEntryValueStore(storeValue);
		setUpdate_valuesJson(JSON.stringify(update_values));
	}

	if(update_valuesJson !== JSON.stringify(update_values)){
		updateUpdate_values();
	}

	const customFormHolder = REF_customFormHolder.current;


	return (
		<div className="margin-10 w-100 d-flex jc-center">
		  <div
		    className="search--width d-flex jc-space-between fd-column"
		    title="characters"
		  >
		
				<InputText
					get_exitValue = {
						objWithFnsForEachCFIDC__get_exitValue[
							API_CHARACTERS__PARAM__NAME
							.name
						]
					}
					entry_value = {
						entryValueStore[
							API_CHARACTERS__PARAM__NAME
							.name
						]
					}
					// prosti menya, gospod'... no ya greshen...
					// @ts-ignore-next-line
					init_instanceOfInputText = {
						customFormHolder.getInstanceOfCFItemFor(
							API_CHARACTERS__PARAM__NAME
						)
					}
				/>
				<InputText
					get_exitValue = {
						objWithFnsForEachCFIDC__get_exitValue[
							API_CHARACTERS__PARAM__SPECIES
							.name
						]
					}
					entry_value = {
						entryValueStore[
							API_CHARACTERS__PARAM__SPECIES
							.name
						]
					}
					// prosti menya, gospod'... no ya greshen...
					// @ts-ignore-next-line
					init_instanceOfInputText = {
						customFormHolder.getInstanceOfCFItemFor(
							API_CHARACTERS__PARAM__SPECIES
						)
					}
				/>
				<InputText
					get_exitValue = {
						objWithFnsForEachCFIDC__get_exitValue[
							API_CHARACTERS__PARAM__TYPE
							.name
						]
					}
					entry_value = {
						entryValueStore[
							API_CHARACTERS__PARAM__TYPE
							.name
						]
					}
					// prosti menya, gospod'... no ya greshen...
					// @ts-ignore-next-line
					init_instanceOfInputText = {
						customFormHolder.getInstanceOfCFItemFor(
							API_CHARACTERS__PARAM__TYPE
						)
					}
				/>
		
		    <div className="filter-select-box d-flex jc-center ai-center">
		
					<SelectMenu 
						get_exitValue = {
							objWithFnsForEachCFIDC__get_exitValue[
								API_CHARACTERS__PARAM__STATUS
								.name
							]
						}
						// prosti menya, gospod'... no ya greshen...
						// @ts-ignore-next-line
						entry_value = {
							entryValueStore[
								API_CHARACTERS__PARAM__STATUS
								.name
							]
						}
						// prosti menya, gospod'... no ya greshen...
						// @ts-ignore-next-line
						init_instanceOfSelectMenu = {
							customFormHolder.getInstanceOfCFItemFor(
								API_CHARACTERS__PARAM__STATUS
							)
						}
					/>
		
		      <div
		        className="show-if-desktop-size"
		        style={{marginLeft: '5px', height: "100%"}}
		      ></div>
		
					<SelectMenu 
						get_exitValue = {
							objWithFnsForEachCFIDC__get_exitValue[
								API_CHARACTERS__PARAM__GENDER
								.name
							]
						}
						// prosti menya, gospod'... no ya greshen...
						// @ts-ignore-next-line
						entry_value = {
							entryValueStore[
								API_CHARACTERS__PARAM__GENDER
								.name
							]
						}
						// prosti menya, gospod'... no ya greshen...
						// @ts-ignore-next-line
						init_instanceOfSelectMenu = {
							customFormHolder.getInstanceOfCFItemFor(
								API_CHARACTERS__PARAM__GENDER
							)
						}
					/>
		
		    </div>
		
		    <button
		      className="
						filter-button color--b6b6b6 bg-color--181a1b tt-uppercase 
						{ isValid ? 'button--has-some': 'button--empty'}
					"
		
					disabled = {!isValid}
		
				  onClick={() => customFormHolder.apply()}
		    >
		      Apply
		    </button>
		  </div>
		</div>
	);
}
