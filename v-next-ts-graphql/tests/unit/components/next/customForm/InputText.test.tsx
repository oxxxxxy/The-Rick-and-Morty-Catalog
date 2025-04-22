import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { 
	expect,
	describe,
	it,
	vi
} from 'vitest';


import {
	API_EPISODES__PARAM_LIST,
	API_EPISODES__PARAM__EPISODE
} from '@tsCF/data';

import type {
	QPC_InputText
} from '@tsLF/forURLSP';

import { 
	CustomFormHolder,
	CFIDCTypeBasedStrategyFn_All 
} from '@tsLF/pages';
import type { ValueStore } from '@tsLF/pages';


import InputText from '@/components/next/customForm/InputText';




const entryValueStore: ValueStore = CustomFormHolder.makeValueStore(API_EPISODES__PARAM_LIST); 

const get_exitValue = (v: QPC_InputText) => {}; 

const props = { 
	entry_value: entryValueStore[ 
			API_EPISODES__PARAM__EPISODE.name 
		], 
	get_exitValue, 
	init_CFIDC_InputText: API_EPISODES__PARAM__EPISODE 
} 


describe(`<InputText /> ; next/customForm/InputText.tsx;`, () => {
	it(`gets entry_value, get_exitValue and throws error.`, () => {
		const _props = {...props};
		delete _props.init_CFIDC_InputText;
		
		const check = () => {
			render(<InputText {..._props} />);
		}

		expect(check).toThrowError();
	})

	it(`gets entry_value, get_exitValue and init_CFIDC_InputText and render it`, () => {
		const check = () => {
			const component = render(<InputText {...props} />);
			
			component.unmount();
		}
		
		expect(check).not.toThrowError();
	})
	
	it(`gets entry_value, get_exitValue, init_CFIDC_InputText, incorrect init_cachedValue and throws error.`, () => {
		const _props = {...props};
		_props.init_cachedValue = { param: "not episode", value: "doesn't matter" };

		const check = () => {
			const component = render(<InputText {..._props} />);
		}
		
		expect(check).toThrowError();
	})
	
	it(`gets entry_value, get_exitValue and init_instanceOfInputText and render it`, () => {
		const CFItem = CFIDCTypeBasedStrategyFn_All(API_EPISODES__PARAM__EPISODE);
		const init_instanceOfInputText = new CFItem({initData: API_EPISODES__PARAM__EPISODE});
	
		const _props = {...props, init_instanceOfInputText};
		delete _props.init_CFIDC_InputText;

		const check = () => {
			const component = render(<InputText {..._props} />);
			
			component.unmount();
		}
		
		expect(check).not.toThrowError();
	})


	it(`checks placeholder styling`, () => {
		const component = render(<InputText {...props} />);

		const check = () => {
			component.getByPlaceholderText('Episode (e.g. S01E03)')
		}

		expect(check).not.toThrowError();
		
		component.unmount();
	})	

	it(`gets entry_value, get_exitValue, init_CFIDC_InputText, init_cachedValue and renders it with value.`, () => {
		const _props = {...props};
		_props.init_cachedValue = { param: "episode", value: "matters" };
		_props.get_exitValue = v => {
			expect(vi.fn()).not.toHaveBeenCalled();
		}

		const check = () => {
			const component = render(<InputText {..._props} />);

			const input = component.container.querySelector('input.text-input');

			expect(input.value).toEqual('matters');

			component.unmount();
		}

		expect(check).not.toThrowError();
	})

	it('checks returning of the value via get_exitValue while user is typing', async () => {
		const userInputText = 'S02E03';
		const _props = {...props};
		_props.get_exitValue = v => {
			expect(!!userInputText.match(v.value)).toBe(true);
		}


		const component = render(<InputText {..._props} />);

		const input = component.container.querySelector('input.text-input');

		await userEvent.type(input, userInputText);


		component.unmount();
	})
	
	it('throws warning if user input value is incorrect, then clears it and checks', async () => {
		let testStep = 'throws warning';

		const userInputText = 'NOTS02E03';
		const _props = {...props};
		_props.get_exitValue = v => {
			if(testStep === 'throws warning'){
				expect(!!v.warning).toBe(true);
			}else if(testStep === 'clears it and checks'){
				expect(!!v.value).toBe(false);
			}
		}


		const component = render(<InputText {..._props} />);
		const input = component.container.querySelector('input.text-input');

		expect(!!component.container.querySelector('span.text-input-warning')).toBe(false);
		expect(!!component.container.querySelector('button').disabled).toBe(true);

		await userEvent.type(input, userInputText);

		expect(!!component.container.querySelector('span.text-input-warning')).toBe(true);
		expect(!!component.container.querySelector('button').disabled).toBe(false);
		
		testStep = 'clears it and checks';
		await userEvent.click(component.container.querySelector('button'));

		expect(!!component.container.querySelector('span.text-input-warning')).toBe(false);
		expect(!!component.container.querySelector('button').disabled).toBe(true);


		component.unmount();
	})
});
