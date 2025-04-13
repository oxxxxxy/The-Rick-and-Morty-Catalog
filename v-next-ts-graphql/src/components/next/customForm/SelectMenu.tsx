'use client';
import { useState, useRef } from 'react';


import type { 
	QPC_IndexedSelectOption,
	QPC_SelectOption
} from '@tsLF/forURLSP';
  
import type { CFIDC_Selection	} from '@tsLF/pages/src/customForm/types';
import type { ConstructorArguments_SelectMenu } from '@tsLF/pages';
import { SelectMenu } from '@tsLF/pages';


import { useGlobalContext } from '@/components/context/globalContext';
  

import SelectMenuIcon from '@/components/next/customForm/icons/SelectMenuIcon';




export default function SelectMenuC(
	{
		init_instanceOfSelectMenu,
		init_CFIDC_Selection,
		init_cachedValue,

		entry_value,
		get_exitValue
	}:{
		entry_value: QPC_IndexedSelectOption;
		get_exitValue: (v: QPC_IndexedSelectOption) => void;

		init_cachedValue?: QPC_SelectOption;
		init_CFIDC_Selection?: CFIDC_Selection;
		init_instanceOfSelectMenu?: SelectMenu;
	}
){
	const { cntxtedMouseEventObservable } = useGlobalContext();

	
	// export let exit_value: QPC_IndexedSelectOption;
	// export let entry_value: QPC_IndexedSelectOption;

	// export let init_cachedValue: QPC_SelectOption;
	// export let init_CFIDC_Selection: CFIDC_Selection;

	// export let init_instanceOfSelectMenu: typeof SelectMenu;


	const [active, set_active] = useState<boolean>(false);
	const [options, set_options] = useState<QPC_IndexedSelectOption[]>([]);

	// let active: boolean = false;
	// let options: QPC_IndexedSelectOption[];


	// const set_active = (act: boolean) => (active = act);
	// const set_options = (ops: QPC_IndexedSelectOption[]) => (options = ops);
	// const set_selected = (sel: QPC_IndexedSelectOption) => (exit_value = sel);
	const set_selected = get_exitValue;
		

	// let selectMenu;
	let REF_selectMenu = useRef<SelectMenu>();
	const [entry_valueJson, setEntry_valueJson] = useState<string>(
		() => {
			let selectMenu: SelectMenu;

			if(init_instanceOfSelectMenu){
				selectMenu = init_instanceOfSelectMenu;
			} else {
				if(!init_CFIDC_Selection){
					throw new Error('SelectMenu must have init_CFIDC_Selection data value as argument.');
				}

				const args: ConstructorArguments_SelectMenu = {
					initData: init_CFIDC_Selection
				};

				selectMenu = new SelectMenu(args);
			}

			REF_selectMenu.current = selectMenu;

			selectMenu.setBridgeToExternalScope({
				set_active,
				set_selected,
				set_options
			});

			if(init_cachedValue){
				selectMenu.setValue(init_cachedValue);
			}

			// const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();
			// actionExecuterAfterMount.addAction(
			// 	() => {
			// 		selectMenu.setValue(entry_value.value);
			// 	}
			// );

			cntxtedMouseEventObservable.attachListener('click', selectMenu);
			
			
			return JSON.stringify(entry_value);
		}
	);


	const selectMenu = REF_selectMenu.current;

	if(entry_valueJson !== JSON.stringify(entry_value)){
		// setInputValue(entry_value.value);

		selectMenu.setValue(entry_value.value);

		setEntry_valueJson(JSON.stringify(entry_value));
	}

	
	
	// if(init_instanceOfSelectMenu){
	// 	selectMenu = init_instanceOfSelectMenu;
	// } else {
	// 	if(!init_CFIDC_Selection){
	// 		throw new Error('SelectMenu must have init_CFIDC_Selection data value as argument.');
	// 	}

	// 	const args: ConstructorArguments_SelectMenu = {
	// 		initData: init_CFIDC_Selection
	// 	};

	// 	selectMenu = new SelectMenu(args);
	// }


	// selectMenu.setBridgeToExternalScope({
	// 	set_active,
	// 	set_selected,
	// 	set_options
	// });

	// if(init_cachedValue){
	// 	selectMenu.setValue(init_cachedValue);
	// }

	// const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();
	// actionExecuterAfterMount.addAction(
	// 	() => {
	// 		selectMenu.setValue(entry_value.value);
	// 	}
	// );


	// $: _active = active;
	// $: _options = options;
	// let _previousEntry_value;
	// $:if(JSON.stringify(entry_value) != JSON.stringify(_previousEntry_value)){

	// 	actionExecuterAfterMount.exec();

	// 	_previousEntry_value = entry_value;
			
	//  options = options;//svelte magic again... FUCK!!!
	// }


	// onMount(() => {
	// 	cntxtedMouseEventObservable.attachListener('click', selectMenu);

	// 	actionExecuterAfterMount.setReady();
	// });


	return (
		<div
		  className="
				select-list-box
				select-list-box--statusGender
			"
		  style={{ overflow: active ? 'visible' : 'hidden' }}
			onClick={(e) => selectMenu.click(e)}
			id={selectMenu.HTMLElement_globalAttribute_id}
		>
		  <div className="select-list bg-color--282828 d-flex fd-column">
				{
					(()=>{
						const components: React.ReactNode[] = [];
						
						for(let i=0; i < options.length; i++){
							const option = options[i];
							if(i === 0){
								components.push(
			   					<span
										className="
											select-list-option-border
											select-list-option
											{
												i === 0 
												? 'selected-select-list-option'
												: ''
											}
										"
										title={option.name}
										key={i}
									>
										{option.name}
									</span>
								);
							}else{
								components.push(
									<span  
										className="  
											select-list-option-border  
											select-list-option  
											{  
												i === _options.length - 1  
												? 'select-list-option-border-last'  
												: ''  
											}  
										"   
										onClick={() => selectMenu.select(option)}  
										title={option.name}  
										key={i}
									>    
										{option.name}  
									</span>  
								);

							}
						}

						return components.length 
							? components
							: null
				// {#each _options as option, i }
				// 	{#if i === 0}
			 //   	 <span
				// 			className="
				// 				select-list-option-border
				// 				select-list-option
				// 				{
				// 					i === 0 
				// 					? 'selected-select-list-option'
				// 					: ''
				// 				}
				// 			"
				// 			title={option.name}
				// 		>
				// 			{option.name}
				// 		</span>
				// 	{:else}
			 //   	 <span
				// 			className="
				// 				select-list-option-border
				// 				select-list-option
				// 				{
				// 					i === _options.length - 1
				// 					? 'select-list-option-border-last'
				// 					: ''
				// 				}
				// 			"
				// 			on:click={() => selectMenu.select(option)}
				// 			title={option.name}
				// 		>
				// 			{option.name}
				// 		</span>
				// 	{/if}
		  //   {/each}
					})()
				}
		  </div>
		  <div className="d-flex ai-center jc-center color--282828 select-list-icon"
		  >
				<SelectMenuIcon />
		  </div>
		</div>
	);
}
