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

	const getNameParamInput = component => {
		const inputs = component.container.querySelectorAll('input.text-input');

		for(const inp of inputs){
			if(inp.placeholder.match(capitalizeWord(API_EPISODES__PARAM__NAME.name))
			){
				return inp;
			}
		}
	}

	it(`checks returning user inputs after apply`, async () => {
		const userInput = 'Just words...';
				
		const _props = {...props};
		_props.get_exitValue = vi.fn();

		
		const component = render(<EpisodesSearch {..._props} />);
		

		await userEvent.type(getNameParamInput(component), userInput);
		await userEvent.click(
			//EpisodesSearch filter apply button
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
			//EpisodesSearch filter apply button
			component.container.querySelector('button.filter-button')
		)
		
		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith([]);
 		});

		
		component.unmount();
	})

	it(`gets new update_values and display it on custom form`, async () => {
		const update_values = [{param: 'name', value: 'name valid input'}];

		const _props = {...props};
		_props.get_exitValue = vi.fn();
		

		const component = render(<EpisodesSearch {..._props} />);

		await userEvent.click(
			//EpisodesSearch filter apply button
			component.container.querySelector('button.filter-button')
		)
		
		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith([]);
 		});

		
		component.rerender(<EpisodesSearch {...({..._props, update_values: update_values}) } key ={'1'}/>)

  		await vi.waitFor(() => {
			//do we have a value from update_values?
			const input = getNameParamInput(component);

			expect(input.value).toBe('name valid input');
  		});

		await userEvent.click(
			//EpisodesSearch filter apply button
			component.container.querySelector('button.filter-button')
		)
			
		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith(update_values);
 		});
	

		component.unmount();
	})

	it(`gets new incorrect update_values and disables apply on custom form`, async () => {
		const update_values = [{param: 'episode', value: 'incorrect input'}];
		const correctValueForEpisodeInputField = 'S02E11';
		// let checkStep = 'no update_values 1';
		
		const _props = {...props};
		_props.get_exitValue = vi.fn();

		
		const component = render(<EpisodesSearch {...({..._props, update_values: update_values}) } />);

		expect((component.container.querySelector('button.filter-button')).disabled).toBe(true);

		await userEvent.click(
			//EpisodesSearch filter apply button
			component.container.querySelector('button.filter-button')
		)

		await vi.waitFor(() => {
  			expect(_props.get_exitValue).not.toBeCalled();
 		});

		
		const getEpisodeParamInput = component => {
			const inputs = component.container.querySelectorAll('input.text-input');
	
			for(const inp of inputs){
				if(inp.placeholder.match(capitalizeWord(API_EPISODES__PARAM__EPISODE.name))
				){
					return inp;
				}
			}
		}

		await userEvent.clear(getEpisodeParamInput(component));
		await userEvent.type(getEpisodeParamInput(component), correctValueForEpisodeInputField)
		await userEvent.click(
			//EpisodesSearch filter apply button
			component.container.querySelector('button.filter-button')
		)
		
		await vi.waitFor(() => {
  			expect(_props.get_exitValue).toHaveBeenCalledWith(
				[{param: API_EPISODES__PARAM__EPISODE.name, value: correctValueForEpisodeInputField}]
			)
 		});

		component.unmount();
	})

});

