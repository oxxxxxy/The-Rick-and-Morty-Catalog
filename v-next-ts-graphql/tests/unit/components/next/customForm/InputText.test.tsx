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

import { CustomFormHolder } from '@tsLF/pages';
import type { ValueStore } from '@tsLF/pages';


import InputText from '@/components/next/customForm/InputText';




describe(`<InputText /> ; component; next/customForm/InputText.tsx;`, () => {

	const entryValueStore: ValueStore = CustomFormHolder. makeValueStore(API_EPISODES__PARAM_LIST);

	const get_exitValue = (v: QPC_InputText) => {};

	const props = {
		entry_value: entryValueStore[
				API_EPISODES__PARAM__EPISODE.name
			],
		get_exitValue
	}

	it(`gets entry_value, get_exitValue and throws error.`, () => {
		const component = render(<InputText {...props} />)	

		expect(component).toThrowError()
	})
	
});
