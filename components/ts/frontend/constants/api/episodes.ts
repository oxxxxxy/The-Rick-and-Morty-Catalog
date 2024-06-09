import {
	QueryParamCompatibleList,
	QueryParamCompatible_Form_TextInput,
	QueryParamCompatible_Form_Selection
} from '@Flib/types';




export const API_EPISODES__PATH = {
	name: 'episodes', // it's only because that https://rickandmortyapi.com/api/episode <--
	path: 'episode'   //
};


export const API_EPISODES__PARAM__NAME = {
	name: 'name',
	type: 'string',
	hint: 'Anatomy Park'
};


export const API_EPISODES__PARAM__EPISODE = {
	name: 'episode',
	type: 'string',
	match: /^S[0-9]{0,2}(E[0-9]{0,2}|)$/,
	hint: 'S01E03'
};


export const API_EPISODES__PARAM_LIST = [
	API_EPISODES__PARAM__NAME,
	API_EPISODES__PARAM__EPISODE
];
