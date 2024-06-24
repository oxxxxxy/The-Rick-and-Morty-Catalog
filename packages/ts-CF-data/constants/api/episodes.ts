import {
	CustomFormInitDataCompatible_List,
	CFIDC_InputText_String,
	CFIDC_InputText_ExactString
} from '@tsLF/pages/src/customForm/types';




export type API_EPISODES__PATH__NAME = 'episodes';

export const API_EPISODES__PATH: {
	readonly name: API_EPISODES__PATH__NAME;
	readonly path: string;
} = {
	name: 'episodes', // it's only because that https://rickandmortyapi.com/api/episode <--
	path: 'episode'   //
};


export const API_EPISODES__PARAM__NAME: CFIDC_InputText_String = {
	name: 'name',
	type: 'string',
	hint: 'Anatomy Park'
};


export const API_EPISODES__PARAM__EPISODE: CFIDC_InputText_ExactString = {
	name: 'episode',
	type: 'exact string',
	hint: 'S01E03',
	match: /^S[0-9]{0,2}(E[0-9]{0,2}|)$/,
	warning: 'Input has to match S[0-9][0-9]E[0-9][0-9], e.g. S02, S03E0, S01E03, etc.'
};


export const API_EPISODES__PARAM_LIST: CustomFormInitDataCompatible_List = [
	API_EPISODES__PARAM__NAME,
	API_EPISODES__PARAM__EPISODE
];
