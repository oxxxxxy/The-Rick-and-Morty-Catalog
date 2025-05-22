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

	const getNameParamInput = component => {
		const inputs = component.container.querySelectorAll('input.text-input');

		for(const inp of inputs){
			if(inp.placeholder.match(capitalizeWord(API_LOCATIONS__PARAM__NAME.name))
			){
				return inp;
			}
		}
	}

	it(`checks returning user inputs after apply`, async () => {
		const userInput = 'Just words...';
		
		const _props = {...props};
		_props.get_exitValue = vi.fn();
	
		
		const component = render(<LocationsSearch {..._props} />);
		

		await userEvent.type(getNameParamInput(component), userInput);
		await userEvent.click(
			//LocationsSearch filter apply button
			component.container.querySelector('button.filter-button')
		)

		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith(
				[
 					{
 				    	"param": "name",
 				    	"value": userInput,
 				   	}
 				]
			);
 		});
	
		
		await userEvent.clear(getNameParamInput(component));
		await userEvent.click(
			//LocationsSearch filter apply button
			component.container.querySelector('button.filter-button')
		)

		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith([]);
 		});
	
		
		component.unmount();
	})

	it(`gets new update_values and display it on custom form`, async () => {
		const update_values = [{param: 'name', value: 'name input'}];

		
		const _props = {...props};
		_props.get_exitValue = vi.fn();
	
		
		const component = render(<LocationsSearch {..._props} />);
		
		await userEvent.click(
			//LocationsSearch filter apply button
			component.container.querySelector('button.filter-button')
		)

		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith([]);
 		});


		component.rerender(<LocationsSearch {...({..._props, update_values: update_values}) } key ={'1'}/>)

		await userEvent.click(
			//LocationsSearch filter apply button
			component.container.querySelector('button.filter-button')
		)
		
		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith(update_values);
 		});


		await userEvent.clear(getNameParamInput(component));
		await userEvent.click(
			//LocationsSearch filter apply button
			component.container.querySelector('button.filter-button')
		)

		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith([]);
 		});


		component.unmount();
	})	
});
