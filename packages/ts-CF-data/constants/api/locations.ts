import {
	CustomFormInitDataCompatible_List,
	CFIDC_Input_String
} from '@tsLF/pages/src/customForm/types';




export type API_LOCATIONS__PATH__NAME = 'locations';

export const API_LOCATIONS__PATH: {
	readonly name: API_LOCATIONS__PATH__NAME;
	readonly path: string;
} = {
	name: 'locations', // it's only because that https://rickandmortyapi.com/api/location <--
	path: 'location'   //
};


export const API_LOCATIONS__PARAM__NAME: CFIDC_Input_String = {
	name: 'name',
	type: 'string',
	hint: 'Earth (Replacement Dimension)'
};


export const API_LOCATIONS__PARAM__TYPE: CFIDC_Input_String = {
	name: 'type',
	type: 'string',
	hint: 'Planet'
};


export const API_LOCATIONS__PARAM__DIMENSION: CFIDC_Input_String = {
	name: 'dimension',
	type: 'string',
	hint: 'Replacement Dimension'
};


export const API_LOCATIONS__PARAM_LIST: CustomFormInitDataCompatible_List = [
	API_LOCATIONS__PARAM__NAME,
	API_LOCATIONS__PARAM__TYPE,
	API_LOCATIONS__PARAM__DIMENSION
];
