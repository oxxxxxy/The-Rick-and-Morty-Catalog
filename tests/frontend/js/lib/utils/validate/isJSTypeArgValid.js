import { expect, test, describe } from 'vitest';

import { V } from '../../global-lib-exit.js';



const PARAM_TYPE__JUST_STRING = {
	type: 'string',
};
const exact_arg_for_PARAM_TYPE__JUST_STRING = 'any string characters... JOPA[]1234567890-=+_)(*&^%$#@!~)';


describe('Test #1. PARAM_TYPE__JUST_STRING.', ()=>{
	test('Should be true with any string characters.', () => {
		const result_of_exact_arg = V.isJSTypeArgValid(
			PARAM_TYPE__JUST_STRING,
			exact_arg_for_PARAM_TYPE__JUST_STRING
		);

		expect(result_of_exact_arg).toEqual(true);
	})
})



const PARAM_TYPE__STRING_WITH_MATCH = {
	type: 'string',
	match: /^S[0-9]{2}E[0-9]{2}$/,
}
const exact_arg_for_PARAM_TYPE__STRING_WITH_MATCH = 'S01E03';

describe('Test #2. PARAM_TYPE__STRING_WITH_MATCH.', ()=>{
	test('Should be true with exact arg.', () => {
		const result_of_exact_arg = V.isJSTypeArgValid(
			PARAM_TYPE__STRING_WITH_MATCH,
			exact_arg_for_PARAM_TYPE__STRING_WITH_MATCH
		);

		expect(result_of_exact_arg).toEqual(true);
	})
})

describe('Test #3. PARAM_TYPE__STRING_WITH_MATCH.', ()=>{
	test('Should be false with non exact arg.', () => {

		const non_exact_arg = 'S001E9';

		const result_of_exact_arg = V.isJSTypeArgValid(
			PARAM_TYPE__STRING_WITH_MATCH,
			non_exact_arg
		);

		expect(result_of_exact_arg).toEqual(false);
	})
})



const AND_ITS_OPTIONS = ['alive', 'dead', 'unknown'];

const PARAM_TYPE__OPTIONS = {
	type: 'options',
	options: AND_ITS_OPTIONS
};
const exact_arg_for_PARAM_TYPE__OPTIONS = 'dead';

describe('Test #4. PARAM_TYPE__OPTIONS.', ()=>{
	test('Should be true with exact arg.', () => {
		const result_of_exact_arg = V.isJSTypeArgValid(
			PARAM_TYPE__OPTIONS,
			exact_arg_for_PARAM_TYPE__OPTIONS
		);

		expect(result_of_exact_arg).toEqual(true);
	})
})

describe('Test #5. PARAM_TYPE__OPTIONS.', ()=>{
	test('Should be false with non exact arg.', () => {
		
		const non_exact_arg = 'alIva';

		const result_of_exact_arg = V.isJSTypeArgValid(
			PARAM_TYPE__OPTIONS,
			non_exact_arg
		);

		expect(result_of_exact_arg).toEqual(false);
	})
})

