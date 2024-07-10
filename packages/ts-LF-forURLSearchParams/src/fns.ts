import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';




export const getQPCBaseListFromURL = (url: typeof URL): QueryParamCompatible_Base[] => 
	[...url.searchParams.keys()]
		.map(
			(e): QueryParamCompatible_Base => (
				{
					param: e,
					value: url.searchParams.get(e)
				}
			)
		);

