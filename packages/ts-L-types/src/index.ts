export interface LooseObject {
    [key: string]: any
}

export type PositiveInteger <T extends number> = 
	number extends T
	? never 
  : `${T}` extends `-${string}` | `${string}.${string}`
		? never 
		: T;

