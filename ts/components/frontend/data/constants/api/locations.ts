import {
	QueryParamCompatibleList,
	QueryParamCompatible_Form_TextInput,
} from '@Glib/frontend/types';




export const API_LOCATIONS__PATH = {
	name: 'locations', // it's only because that https://rickandmortyapi.com/api/location <--
	path: 'location'   //
};


export const API_LOCATIONS__PARAM__NAME: QueryParamCompatible_Form_TextInput = {
	name: 'name',
	type: 'string',
	hint: 'Earth (Replacement Dimension)'
};


export const API_LOCATIONS__PARAM__TYPE: QueryParamCompatible_Form_TextInput = {
	name: 'type',
	type: 'string',
	hint: 'Planet'
};


export const API_LOCATIONS__PARAM__DIMENSION: QueryParamCompatible_Form_TextInput = {
	name: 'dimension',
	type: 'string',
	hint: 'Replacement Dimension'
};


export const API_LOCATIONS__PARAM_LIST = [
	API_LOCATIONS__PARAM__NAME,
	API_LOCATIONS__PARAM__TYPE,
	API_LOCATIONS__PARAM__DIMENSION
];
