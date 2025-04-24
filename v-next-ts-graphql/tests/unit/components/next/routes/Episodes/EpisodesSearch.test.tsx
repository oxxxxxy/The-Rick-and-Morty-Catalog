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
	API_EPISODES__PARAM_LIST,
	API_EPISODES__PARAM__NAME,
	API_EPISODES__PARAM__EPISODE
} from '@tsCF/data';

import {
	capitalizeWord
} from '@tsLF/pages';


import EpisodesSearch from '@/components/next/routes/Episodes/EpisodesSearch';


const props = {
	get_exitValue: (v: QueryParamCompatible_Base[]) => {},
	init_cachedValues: [],
	update_values: []
}

describe(`<EpisodesSearch /> ; next/routes/Locations/LocationsSearch.tsx`, () => {
	it(`Initiates rendering with empty update_value, init_cachedValue without errors`, () => {

		const check = () => {
			render(<EpisodesSearch {...props} />).unmount();
		}

		expect(check).not.toThrowError();
	})
	
	it(`Initiates rendering with incorrect update_value, init_cachedValue without errors`, () => {
		const _props = {...props};
		_props.update_values= [{param:'adf', value:'adf'}]
		_props.init_cachedValues= [{param:'asdf', value:'adf'}]
		
		const check = () => {
			render(<EpisodesSearch {..._props} />).unmount();
		}

		expect(check).not.toThrowError();
	})

	it(`checks existence of InputTexts of 2 episode params`, () => {

		const check = () => {
			const component = render(<EpisodesSearch {...props} />);
			
			const inputs = component.container.querySelectorAll('input.text-input');

			expect(inputs.length).toEqual(2);

			let params = 0;

			for(let i = 0; i< 2; i++){
				if(
					!!API_EPISODES__PARAM_LIST.find(
						e => 
							inputs[i].placeholder
							.match(capitalizeWord(e.name))
					)
				){
					++params;
				}
			}

			expect(params).toBe(2);

			component.unmount();
		}

		expect(check).not.toThrowError();
	})

	it(`checks availability to apply an empty/part-filled custom form and returning of user input`, async () => {
		const check = () => {
			const component = render(<EpisodesSearch {...props} />);
			
			const inputs = component.container.querySelectorAll('input.text-input');
			const applyButton = component.container.querySelector('button.filter-button');

			expect(applyButton.disabled).toBe(true);
			// TODO

			console.log(applyButton)

			expect(inputs.length).toEqual(2);

			let params = 0;

			for(let i = 0; i< 2; i++){
				if(
					!!API_EPISODES__PARAM_LIST.find(
						e => 
							inputs[i].placeholder
							.match(capitalizeWord(e.name))
					)
				){
					++params;
				}
			}

			expect(params).toBe(2);

			component.unmount();
		}

		expect(check).not.toThrowError();
	})

	
});

