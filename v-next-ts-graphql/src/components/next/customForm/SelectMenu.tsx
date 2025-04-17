'use client';
import { useState, useRef } from 'react';


import type { 
	QueryParamCompatible_Base,
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
		get_exitValue: (v: QueryParamCompatible_Base) => void;

		init_cachedValue?: QPC_SelectOption;
		init_CFIDC_Selection?: CFIDC_Selection;
		init_instanceOfSelectMenu?: SelectMenu;
	}
){
	const { cntxtedMouseEventObservable } = useGlobalContext();
	const [active, set_active] = useState<boolean>(false);
	const [options, set_options] = useState<QPC_IndexedSelectOption[]>([]);
	const set_selected = get_exitValue;

	const REF_selectMenu = useRef<SelectMenu>();
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

			cntxtedMouseEventObservable.attachListener('click', selectMenu);
			
			
			return JSON.stringify(entry_value);
		}
	);


	const selectMenu = REF_selectMenu.current;

	if(entry_valueJson !== JSON.stringify(entry_value)){
		selectMenu.setValue(entry_value.value);

		setEntry_valueJson(JSON.stringify(entry_value));
	}

	
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
										className={`
											select-list-option-border
											select-list-option
											${
												i === 0 
												? 'selected-select-list-option'
												: ''
											}
										`}
										title={option.name}
										key={i}
									>
										{option.name}
									</span>
								);
							}else{
								components.push(
									<span  
										className={`
											select-list-option-border  
											select-list-option  
											${  
												i === options.length - 1  
												? 'select-list-option-border-last'  
												: ''  
											}  
										`}
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
