export interface QueryParamCompatible_Base {
	readonly name: string;
	readonly type: 'string' | 'options';
}

export interface QueryParamCompatible_Form_TextInput extends QueryParamCompatible_Base {
	type: 'string';
	readonly hint: string;
	readonly match?: RegExp;
}

export interface QueryParamCompatible_Form_Selection extends QueryParamCompatible_Base {
	type: 'options';
	readonly options: readonly string[];
}

export type QueryParamCompatibleList = readonly (
	QueryParamCompatible_Form_TextInput
	| QueryParamCompatible_Form_Selection
)[];


