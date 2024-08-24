export interface LooseObject {
    [key: string]: any
}

export type PositiveInteger <T extends number> = `${T}` extends '0' | `-${any}` | `${any}.${any}` ? never : T;

export type ObjectWithStringValues = {
	[key: string]: string;
}
