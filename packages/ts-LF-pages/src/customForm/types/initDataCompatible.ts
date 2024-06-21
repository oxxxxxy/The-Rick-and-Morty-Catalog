export interface CustomFormInitDataCompatible_Base {
	readonly name: string;
	readonly type: 'string' | 'options';
}

export interface CFIDC_Input_String extends CustomFormInitDataCompatible_Base {
	type: 'string';
	readonly hint: string;
}

export interface CFIDC_Input_ExactString extends CFIDC_Input_String {
	readonly match: RegExp;
	readonly warning: string;
}

export interface CFIDC_Selection extends CustomFormInitDataCompatible_Base {
	type: 'options';
	readonly options: readonly string[];
}

export type CustomFormInitDataCompatible_StringList = readonly (
	CFIDC_Input_String
	| CFIDC_Input_ExactString
)[];

export type CustomFormInitDataCompatible_List = readonly (
	CFIDC_Input_String
	| CFIDC_Input_ExactString
	| CFIDC_Selection
)[];


