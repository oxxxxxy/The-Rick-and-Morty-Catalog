import { 
	render,
	fireEvent
} from '@testing-library/react';
import { 
	expect,
	describe,
	it
} from 'vitest';


import {
	API_EPISODES__PARAM_LIST,
	API_EPISODES__PARAM__EPISODE
} from '@tsCF/data';

import type {
	QPC_InputText
} from '@tsLF/forURLSP';

import { CustomFormHolder } from '@tsLF/pages';
import type { ValueStore } from '@tsLF/pages';


import InputText from '@/components/next/customForm/InputText';




describe(`<InputText /> ; component; next/customForm/InputText.tsx;`, () => {
	const entryValueStore: ValueStore = CustomFormHolder.makeValueStore(API_EPISODES__PARAM_LIST);

	const get_exitValue = (v: QPC_InputText) => {};

	const props = {
		entry_value: entryValueStore[
				API_EPISODES__PARAM__EPISODE.name
			],
		get_exitValue,
		init_CFIDC_InputText: API_EPISODES__PARAM__EPISODE
	}


	it(`gets entry_value, get_exitValue and init_CFIDC_InputText and render it`, () => {
		const check = () => {
			const component = render(<InputText {...props} />);
			
			component.unmount();
		}
		
		expect(check).not.toThrowError();
	})

	it(`gets entry_value, get_exitValue and throws error.`, () => {
		const _props = {...props};
		delete _props.init_CFIDC_InputText;
		
		const check = () => {
			render(<InputText {..._props} />);
		}

		expect(check).toThrowError();
	})


	it(`checks placeholder styling`, () => {
		const component = render(<InputText {...props} />);

		const check = () => {
			component.getByPlaceholderText('Episode (e.g. S01E03)')
		}

		expect(check).not.toThrowError();
		
		component.unmount();
	})	



// 		const input = component.container.querySelector('input.text-input');
// console.log(component)
		// console.log(input.placeholder);
	// console.log(API_EPISODES__PARAM__EPISODE)
	// 	screen.getByPlaceholderText(API_EPISODES__PARAM__EPISODE.hint)

		// component.unmount();
	
});
