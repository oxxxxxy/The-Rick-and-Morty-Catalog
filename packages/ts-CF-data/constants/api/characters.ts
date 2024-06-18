import {
	QueryParamCompatibleList,
	QueryParamCompatible_Form_TextInput,
	QueryParamCompatible_Form_Selection
} from '@tsLF/types';




export type API_CHARACTERS__PATH__NAME = 'characters';
// what to do with that??? THINK!!!
export const API_CHARACTERS__PATH: {
	readonly name: API_CHARACTERS__PATH__NAME;
	readonly path: string;
} = {
	name: 'characters', // it's only because that https://rickandmortyapi.com/api/character <--
	path: 'character'   //
};


export const API_CHARACTERS__PARAM__NAME: QueryParamCompatible_Form_TextInput = {
	name: 'name',
	type: 'string',
	hint: 'Morty'
};


const API_CHARACTERS__PARAM__STATUS_OPTIONS = ['alive', 'dead', 'unknown'];

const TYPE__API_CHARACTERS__PARAM__STATUS_OPTIONS = ['alive', 'dead', 'unknown'] as const;

interface TYPE__API_CHARACTERS__PARAM__STATUS extends QueryParamCompatible_Form_Selection{
	value?: typeof TYPE__API_CHARACTERS__PARAM__STATUS_OPTIONS[number];
}

export const API_CHARACTERS__PARAM__STATUS: TYPE__API_CHARACTERS__PARAM__STATUS = {
	name: 'status',
	type: 'options',
	options: API_CHARACTERS__PARAM__STATUS_OPTIONS
};


export const API_CHARACTERS__PARAM__SPECIES: QueryParamCompatible_Form_TextInput = {
	name: 'species',
	type: 'string',
	hint: 'Human'
};


export const API_CHARACTERS__PARAM__TYPE: QueryParamCompatible_Form_TextInput = {
	name: 'type',
	type: 'string',
	hint: 'Parasite'
};


const API_CHARACTERS__PARAM__GENDER_OPTIONS = ['female', 'male', 'genderless', 'unknown'];

const TYPE__API_CHARACTERS__PARAM__GENDER_OPTIONS = ['female', 'male', 'genderless', 'unknown'] as const;

interface TYPE__API_CHARACTERS__PARAM__GENDER extends QueryParamCompatible_Form_Selection {
	value?: typeof TYPE__API_CHARACTERS__PARAM__GENDER_OPTIONS[number];
}

export const API_CHARACTERS__PARAM__GENDER: TYPE__API_CHARACTERS__PARAM__GENDER  = {
	name: 'gender',
	type: 'options',
	options: API_CHARACTERS__PARAM__GENDER_OPTIONS
};


export const API_CHARACTERS__PARAM_LIST: QueryParamCompatibleList = [
	API_CHARACTERS__PARAM__NAME,
	API_CHARACTERS__PARAM__STATUS,
	API_CHARACTERS__PARAM__SPECIES,
	API_CHARACTERS__PARAM__TYPE,
	API_CHARACTERS__PARAM__GENDER
];
