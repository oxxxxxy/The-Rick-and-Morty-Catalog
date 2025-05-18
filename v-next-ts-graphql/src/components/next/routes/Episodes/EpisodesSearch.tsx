import { useState, useRef } from 'react';
 
 
import {
	API_EPISODES__PARAM__EPISODE,
	API_EPISODES__PARAM__NAME,
	API_EPISODES__PARAM_LIST
} from '@tsCF/data';
 
import type { 
	QueryParamCompatible_Base
} from '@tsLF/forURLSP';
 
import { CustomFormHolder } from '@tsLF/pages';
import type { 
	ArgumentsFor_CustomFormHolder,
	ValueStore,
	objWithFnsForEachCFIDC__get_exitValue
} from '@tsLF/pages';
 
 
import InputText from '@/components/next/customForm/InputText';
 
 
 

export default function EpisodesSearch(
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
	const [isValid, setIsValid] = useState<boolean>(true);
	// const [update_valuesJson, setUpdate_valuesJson] = useState<string>(JSON.stringify(update_values));
	const set_value = get_exitValue;
	const set_applyActivity = setIsValid;

	const [exitValueStore, setExitValueStore] = useState<ValueStore>({});
	const [exitValueStoreJson, setExitValueStoreJson] = useState<string>('')
	const [entryValueStore, setEntryValueStore] = useState<ValueStore>({});

	const REF_customFormHolder = useRef<CustomFormHolder>();


	const [objWithFnsForEachCFIDC__get_exitValue] = useState<objWithFnsForEachCFIDC__get_exitValue>(
		() => {
			const CFIDCList = API_EPISODES__PARAM_LIST;

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
				// const storeValue = CustomFormHolder.makeValueStore(API_EPISODES__PARAM_LIST);
				// CustomFormHolder.setValuesToValueStore(storeValue, update_values);
				// setExitValueStore(storeValue);

				updateUpdate_values();

				
			}

			const objWithFnsForEachCFIDC__get_exitValue: objWithFnsForEachCFIDC__get_exitValue = {};
			
			for(const el of CFIDCList){
				objWithFnsForEachCFIDC__get_exitValue[el.name] = (v: QueryParamCompatible_Base) => {
					exitValueStore[el.name] = v;
					setExitValueStore(exitValueStore);
					// prosti menya, gospod'... no ya greshen...
					// @ts-ignore-next-line
					console.log(
						JSON.stringify(v),
						'before recieveExitValueStore',
						JSON.stringify(exitValueStore)
					)

					REF_customFormHolder.current.recieveExitValueStore(exitValueStore);

	// if(exitValueStoreJson !== JSON.stringify(exitValueStore)){
		// updateUpdate_values();
	// 	console.log('updateUpdate_values, exitValueStoreJson')
	// }
				}
			}
			
			return objWithFnsForEachCFIDC__get_exitValue;
		}
	);

	
	if(!REF_customFormHolder.current){
		throw new Error('OMG WE\'RE ALL GOING TO DIE!!!! Let\'s fuck in the asses, dudes.');
	}

	function updateUpdate_values(){
		const storeValue = CustomFormHolder.makeValueStore(API_EPISODES__PARAM_LIST);
		CustomFormHolder.setValuesToValueStore(storeValue, update_values);
		CustomFormHolder.setValuesToValueStore(
			storeValue,
			CustomFormHolder.makeQPCListFromValueStore(
				exitValueStore
			)
		);
		setEntryValueStore(storeValue);
		// setUpdate_valuesJson(JSON.stringify(update_values));
	}



	// if(update_valuesJson !== JSON.stringify(update_values)){
	// 	updateUpdate_values();
	// 	console.log('updateUpdate_values, HIIIIIIIIIIIIIIIII')
	// 	alert('sosal?')
	// ne rabotaet vasche
	// }

	const customFormHolder = REF_customFormHolder.current;

	console.log(
		JSON.stringify(
			entryValueStore
		),
		'EpisodesSearch', '\n',
		JSON.stringify(
			update_values
		),
		'update_values', '\n',
		isValid, 'isValid', '\n'

	)
	
	return (
		<div className="margin-10 w-100 d-flex jc-center">
		  <div
		    className="search--width d-flex jc-space-between fd-column"
		    title="episodes"
		  >
		
				<InputText
					get_exitValue = {
						objWithFnsForEachCFIDC__get_exitValue[
							API_EPISODES__PARAM__NAME
							.name
						]
					}
					entry_value = {
						entryValueStore[
							API_EPISODES__PARAM__NAME
							.name
						]
					}
					// prosti menya, gospod'... no ya greshen...
					// @ts-ignore-next-line
					init_instanceOfInputText = {
						customFormHolder.getInstanceOfCFItemFor(
							API_EPISODES__PARAM__NAME
						)
					}
					
					key={
						//is it okay? wtf...
						API_EPISODES__PARAM__NAME
						.name + 
						new Date().getTime() +
						JSON.stringify(
							entryValueStore[
								API_EPISODES__PARAM__NAME
								.name
							]
						)
					}
				/>
				<InputText
					get_exitValue = {
						objWithFnsForEachCFIDC__get_exitValue[
							API_EPISODES__PARAM__EPISODE
							.name
						]
					}
					entry_value = {
						entryValueStore[
							API_EPISODES__PARAM__EPISODE
							.name
						]
					}
					// prosti menya, gospod'... no ya greshen...
					// @ts-ignore-next-line
					init_instanceOfInputText = {
						customFormHolder.getInstanceOfCFItemFor(
							API_EPISODES__PARAM__EPISODE
						)
					}
					
					key={
						//is it okay? wtf...
						API_EPISODES__PARAM__EPISODE
						.name + 
						new Date().getTime() +
						JSON.stringify(
							entryValueStore[
								API_EPISODES__PARAM__EPISODE
								.name
							]
						)
					}
				/>
		
		    <div className="filter-select-box d-flex jc-center ai-center">
		
		
		    </div>

{/*
2 stula
	1 stul
		sdelat' knopku apply otdelno i v nee pihat' vso, chto ee kasaetsa, mb, budet tolko ona obnovlyatsa
	2 stul
		kidat' focus v inputText.tsx
*/}	
		
		    <button
		      className={`
						filter-button color--b6b6b6 bg-color--181a1b tt-uppercase 
						${ isValid ? 'button--has-some': 'button--empty'}
					`}
		
					disabled = {!isValid}
		
				  onClick={() => customFormHolder.apply()}
		    >
		      Apply
		    </button>
		  </div>
		</div>
	);
}
