import { useState } from 'react';


import type { CFIDC_InputText_Base } from '@tsLF/pages';
import { CFIDCTypeBasedStrategyFn_InputText } from '@tsLF/pages';
import type { InputText_ClassType_OneOf } from '@tsLF/pages';

import type { QPC_InputText } from '@tsLF/forURLSP';

	
import InputTextClearIcon from '@/components/next/customForm/icons/InputTextClearIcon';




export default function InputText(
	{
		init_instanceOfInputText,
		init_CFIDC_InputText,
		init_cachedValue,

		entry_value,
		get_exitValue
	}:{
		entry_value: QPC_InputText;
		get_exitValue: (v: QPC_InputText) => void;

		init_cachedValue?: QPC_InputText;
		init_CFIDC_InputText?: CFIDC_InputText_Base;
		init_instanceOfInputText?: InputText_ClassType_OneOf;
	}
){
	const [placeholder, set_placeholder] = useState<string>('');
	const [warning, set_warning] = useState<string>('');
	const set_value = get_exitValue;
	const [inputValue, setInputValue] = useState<string>('');
	const [entry_valueJson, setEntry_valueJson] = useState<string>(JSON.stringify(entry_value));
	const [inputText] = useState<InputText_ClassType_OneOf>(
		(): InputText_ClassType_OneOf => {
		
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
					throw new Error(`init_CFIDC_InputText or init_instanceOfInputText must be passed.`);
				}
			
				if(init_cachedValue){
					if(init_cachedValue.param != init_CFIDC_InputText.name){
						throw new Error(`Value of the init_cachedValue.param is not equal to init_CFIDC_InputText.name. Check passed args. ` + JSON.stringify(init_cachedValue));
					}
				}
			
				const _class = CFIDCTypeBasedStrategyFn_InputText(init_CFIDC_InputText);
			
				inputText = new _class(
					{
						// prosti menya, gospod'... no ya greshen...
						// @ts-ignore-next-line
						initData: init_CFIDC_InputText,
			
						set_value,
						set_placeholder,
						set_warning
					}
				);
			}
				
			setInputValue(entry_value.value);

			inputText.setValue(entry_value.value);

			setEntry_valueJson(JSON.stringify(entry_value));

			if(init_cachedValue){
				setInputValue(init_cachedValue.value);
			}

			return inputText;
		}
	);


	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);

	 	inputText.setValue(e.target.value);
	}

	const clear = () => (
		inputText.clear(),
		setInputValue(''),
		set_warning('')
	);


	return(
		<div className="text-input-option d-flex w-100 fd-column">
			<div className="fd-row d-flex w-100">
			  <div className="text-input-box">
			    <div className="text-input-underline bg-color--282828"></div>
			    <input
			      className="text-input bg-color--b6b6b6 color--282828"
			      type="text"
			      placeholder={placeholder}
			      value={inputValue}
						onChange={onChange}
			    />
			  </div>
				<button
				  className={`
				  	ai-center jc-center text-input-clear fill--999999 bg-color--181a1b
						${!inputValue ? 'button--empty' : 'button--has-some'}
				  `}
				  disabled={!inputValue}
				  onClick={clear}
				>
					<InputTextClearIcon />
				</button>
		  </div>
		
		  {
		  	warning ?
					( 
						<div className="text-input-option d-flex w-100">
							<span className="text-input-warning w-100">
								{warning}
							</span>
						</div>
					)
				: null
			}
		
		</div>
	);
}
