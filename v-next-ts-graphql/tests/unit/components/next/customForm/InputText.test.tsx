import React from 'react';
import { 
	screen,
	render
} from '@testing-library/react';


import {
	API_EPISODES__PARAM_LIST,
	API_EPISODES__PARAM__EPISODE
} from '@tsCF/data';



import type {
	QPC_InputText
} from '@tsLF/forURLSP';

// import * as CustomFormHolder from '@tsLF/pages';
import { CustomFormHolder } from '@tsLF/pages';
import type { ValueStore } from '@tsLF/pages';


import InputText from '@/components/next/customForm/InputText';




// jest.mock('@tsLF/pages', () => {
// 	return {CustomFormHolder}
// })

describe(`<InputText /> ; component; next/customForm/InputText.tsx;`, () => {
console.log(API_EPISODES__PARAM__EPISODE)
console.log(CustomFormHolder)
	const entryValueStore: ValueStore = CustomFormHolder.makeValueStore(API_EPISODES__PARAM_LIST);

	const get_exitValue = (v: QPC_InputText) => {};

	const props = {
		entry_value: entryValueStore[
				API_EPISODES__PARAM__EPISODE.name
			],
		get_exitValue,
		init_CFIDC_InputText: API_EPISODES__PARAM__EPISODE
	}

	it(`gets entry_value, get_exitValue and throws error.`, () => {
		
		// oshibka tut
		render(<InputText {...props} />)	

		// expect(component).toThrowError()
	})
	
});

describe('check', ()=>{
	it('has name', ()=>{
		console.log(API_EPISODES__PARAM__EPISODE);
		expect(API_EPISODES__PARAM__EPISODE.name).toEqual('episode')
		expect(API_EPISODES__PARAM__EPISODE.name).not.toEqual('epis')
	})
})

