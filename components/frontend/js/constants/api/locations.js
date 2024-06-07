export const API_LOCATIONS__PATH = {
	name: 'locations', // it's only because that https://rickandmortyapi.com/api/location <--
	path: 'location'   //
};


export const API_LOCATIONS__PARAM__NAME = {
	name: 'name',
	type: 'string',
	hint: 'Earth (Replacement Dimension)'
};


export const API_LOCATIONS__PARAM__TYPE = {
	name: 'type',
	type: 'string',
	hint: 'Planet'
};


export const API_LOCATIONS__PARAM__DIMENSION = {
	name: 'dimension',
	type: 'string',
	hint: 'Replacement Dimension'
};


export const API_LOCATIONS__PARAM_LIST = [
	API_LOCATIONS__PARAM__NAME,
	API_LOCATIONS__PARAM__TYPE,
	API_LOCATIONS__PARAM__DIMENSION
];


