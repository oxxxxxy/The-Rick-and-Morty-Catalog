export const API_CHARACTERS__PATH = {
	name: 'characters', // it's only because that https://rickandmortyapi.com/api/character <--
	path: 'character'   //
};


export const API_CHARACTERS__PARAM__NAME = {
	name: 'name',
	type: 'string',
	hint: 'Morty'
};


export const API_CHARACTERS__PARAM__STATUS_OPTIONS = ['alive', 'dead', 'unknown'];

export const API_CHARACTERS__PARAM__STATUS = {
	name: 'status',
	type: 'options',
	options: API_CHARACTERS__PARAM__STATUS_OPTIONS
};


export const API_CHARACTERS__PARAM__SPECIES = {
	name: 'species',
	type: 'string',
	hint: 'Human'
};


export const API_CHARACTERS__PARAM__TYPE = {
	name: 'type',
	type: 'string',
	hint: 'Parasite'
};


export const API_CHARACTERS__PARAM__GENDER_OPTIONS = ['female', 'male', 'genderless', 'unknown'];

export const API_CHARACTERS__PARAM__GENDER = {
	name: 'gender',
	type: 'options',
	options: API_CHARACTERS__PARAM__GENDER_OPTIONS
};


export const API_CHARACTERS__PARAM_LIST = [
	API_CHARACTERS__PARAM__NAME,
	API_CHARACTERS__PARAM__STATUS,
	API_CHARACTERS__PARAM__SPECIES,
	API_CHARACTERS__PARAM__TYPE,
	API_CHARACTERS__PARAM__GENDER
];



