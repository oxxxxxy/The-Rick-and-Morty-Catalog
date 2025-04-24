import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { 
	expect,
	describe,
	it,
	vi
} from 'vitest';


import type {
	QueryParamCompatible_Base
} from '@tsLF/forURLSP';

import {
	API_LOCATIONS__PARAM__NAME,
	API_LOCATIONS__PARAM__DIMENSION,
	API_LOCATIONS__PARAM__TYPE,
	API_LOCATIONS__PARAM_LIST
} from '@tsCF/data';

import {
	capitalizeWord
} from '@tsLF/pages';


import LocationsSearch from '@/components/next/routes/Locations/LocationsSearch';


const props = {
	get_exitValue: (v: QueryParamCompatible_Base[]) => {},
	init_cachedValues: [],
	update_values: []
}

describe(`<LocationsSearch /> ; next/routes/Locations/LocationsSearch.tsx`, () => {
	it(`Initiates rendering with empty update_value, init_cachedValue without errors`, () => {

		const check = () => {
			render(<LocationsSearch {...props} />).unmount();
		}

		expect(check).not.toThrowError();
	})
	
	it(`Initiates rendering with incorrect update_value, init_cachedValue without errors`, () => {
		const _props = {...props};
		_props.update_values= [{param:'adf', value:'adf'}]
		_props.init_cachedValues= [{param:'asdf', value:'adf'}]
		
		const check = () => {
			render(<LocationsSearch {..._props} />).unmount();
		}

		expect(check).not.toThrowError();
	})

	it(`checks existence of InputTexts of 3 location params`, () => {

		const check = () => {
			const component = render(<LocationsSearch {...props} />);
			
			const inputs = component.container.querySelectorAll('input.text-input');

			expect(inputs.length).toEqual(3);

			let params = 0;

			for(let i = 0; i< 3; i++){
				if(
					!!API_LOCATIONS__PARAM_LIST.find(
						e => 
							inputs[i].placeholder
							.match(capitalizeWord(e.name))
					)
				){
					++params;
				}
			}

			expect(params).toBe(3);

			component.unmount();
		}

		expect(check).not.toThrowError();
	})

	it(`checks returning user inputs after apply`, async () => {
		const userInput = 'Just words...';

		let checkStep = 'returning just words';
		
		const _props = {...props};
		_props.get_exitValue = v => {
			if(checkStep === 'returning just words'){
				expect(!!userInput.match(v[0].value)).toBe(true);
			}else{
				expect(v.length).toBe(0);
			}
		}
		
		const component = render(<LocationsSearch {..._props} />);
		
		const inputs = component.container.querySelectorAll('input.text-input');
		const applyButton = component.container.querySelector('button.filter-button');

		let paramNameInputField;

		for(let i = 0; i< 3; i++){
			if(inputs[i].placeholder.match(capitalizeWord(API_LOCATIONS__PARAM__NAME.name))
			){
				paramNameInputField = inputs[i];
			}
		}

		await userEvent.type(paramNameInputField, userInput);
		await userEvent.click(applyButton)

		checkStep = 'clearing by hands';
		
		await userEvent.clear(paramNameInputField);
		await userEvent.click(applyButton)
		
		component.unmount();
	})

	
});
