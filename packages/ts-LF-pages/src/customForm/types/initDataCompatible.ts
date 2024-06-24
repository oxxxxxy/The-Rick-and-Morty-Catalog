export type CFIDC_Types_InputText = 'string' | 'exact string';

export type CFIDC_Types_Options = 'options';

export type CFIDC_Types_All = CFIDC_Types_Options 
| CFIDC_Types_InputText ;


export interface CustomFormInitDataCompatible_Base {
	readonly name: string;
	readonly type: CFIDC_Types_All;
}

export interface CFIDC_InputText_String extends CustomFormInitDataCompatible_Base {
	readonly type: 'string';
	readonly hint: string;
}

export interface CFIDC_InputText_ExactString extends CustomFormInitDataCompatible_Base {
	readonly type: 'exact string';
	readonly match: RegExp;
	readonly warning: string;
	readonly hint: string;
}

export interface CFIDC_Selection extends CustomFormInitDataCompatible_Base {
	readonly type: 'options';
	readonly options: readonly string[];
}

export type CustomFormInitDataCompatible_String = CFIDC_InputText_String
	| CFIDC_InputText_ExactString
;

export type CustomFormInitDataCompatible_List = readonly (
	CFIDC_InputText_String
	| CFIDC_InputText_ExactString
	| CFIDC_Selection
)[];


