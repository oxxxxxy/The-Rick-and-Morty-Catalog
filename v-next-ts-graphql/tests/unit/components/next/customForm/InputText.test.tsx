

import React from 'react';
import { 
	screen,
	render
} from '@testing-library/react';


import {
	API_EPISODES__PARAM_LIST,
	API_EPISODES__PARAM__EPISODE
} from '@tsCF/data';
console.log(API_EPISODES__PARAM__EPISODE)


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
		// entry_value: { param: '', value: '' },
		get_exitValue,
		init_CFIDC_InputText: API_EPISODES__PARAM__EPISODE
	}

	it(`gets entry_value, get_exitValue and throws error.`, () => {
	

		
		// oshibka tut
		// render(<InputText {...props} />);
		render(
			<InputText 
				entry_value={
					entryValueStore[
						API_EPISODES__PARAM__EPISODE.name
					]
					// props.entry_value
				}

				get_exitValue={get_exitValue}

				init_CFIDC_InputText={API_EPISODES__PARAM__EPISODE}
			/>
		)	

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

