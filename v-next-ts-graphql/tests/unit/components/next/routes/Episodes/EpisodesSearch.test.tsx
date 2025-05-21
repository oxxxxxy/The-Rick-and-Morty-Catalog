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

describe(`<EpisodesSearch /> ; next/routes/Locations/EpisodesSearch.tsx`, () => {
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
		
		const component = render(<EpisodesSearch {..._props} />);
		
		const inputs = component.container.querySelectorAll('input.text-input');
		const applyButton = component.container.querySelector('button.filter-button');

		let paramNameInputField;

		for(let i = 0; i< 2; i++){
			if(inputs[i].placeholder.match(capitalizeWord(API_EPISODES__PARAM__NAME.name))
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

	it(`gets new update_values and display it on custom form`, async () => {
		const update_values = [{param: 'name', value: 'name input'}];

		let checkStep = 'no update_values 1';
		
		const _props = {...props};
		_props.get_exitValue = v => {
			if(checkStep === 'no update_values 1'){
				expect(v.length).toBe(0);
			}else if(checkStep === 'update_values'){
				expect(!!update_values[0].value.match(v[0].value)).toBe(true);
			} else if( checkStep === 'no update_values 2' ){
				expect(v.length).toBe(0);
			}
		}
		
		const component = render(<EpisodesSearch {..._props} />);
		
		const inputs = component.container.querySelectorAll('input.text-input');
		const applyButton = component.container.querySelector('button.filter-button');

		let paramNameInputField;

		for(let i = 0; i< 2; i++){
			if(inputs[i].placeholder.match(capitalizeWord(API_EPISODES__PARAM__NAME.name))
			){
				paramNameInputField = inputs[i];
			}
		}

		await userEvent.click(applyButton)

		component.rerender(<EpisodesSearch update_values={ update_values }/>)

		checkStep = 'update_values';
		
		await userEvent.click(applyButton);

		checkStep = 'no update_values 2';

		await userEvent.clear(paramNameInputField);
		await userEvent.click(applyButton);

		component.unmount();
	})

	it(`gets new incorrect update_values and disables apply on custom form`, async () => {
		const update_values = [{param: 'episode', value: 'incorrect input'}];
		const correctValueForEpisodeInputField = 'S02E11';
		let checkStep = 'no update_values 1';
		
		const _props = {...props};
		_props.get_exitValue = v => {
			if(checkStep === 'no update_values 1'){
				expect(v.length).toBe(0);
			}else if(checkStep === 'incorrect update_values'){
				expect(vi.fn()).not.toBeCalled();
			} else if( checkStep === 'correct update_values' ){
				expect(!!correctValueForEpisodeInputField.match(v[0].value)).toBe(true);
			}
		}
		
		const component = render(<EpisodesSearch {..._props} />);
		
		const inputs = component.container.querySelectorAll('input.text-input');
		const applyButton = component.container.querySelector('button.filter-button');

		let paramEpisodeInputField;

		for(let i = 0; i< 2; i++){
			if(inputs[i].placeholder.match(capitalizeWord(API_EPISODES__PARAM__EPISODE.name))
			){
				paramEpisodeInputField = inputs[i];
			}
		}

		await userEvent.click(applyButton)

		checkStep = 'incorrect update_values';

		await component.rerender(<EpisodesSearch update_values={ update_values }/>)

		expect(applyButton.disabled).toBe(true);

		await userEvent.click(applyButton);

		checkStep = 'correct update_values';

		await userEvent.clear(paramEpisodeInputField);
		await userEvent.type(paramEpisodeInputField, correctValueForEpisodeInputField)
		await userEvent.click(applyButton);

		component.unmount();
	})

});

