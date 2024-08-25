import type { UT } from '@tsC/api-graphql-to-ex';




export const makeFnForItemPageManagerMakeReqFn = (
	getItemById: ({id}:{id:string}) => UT.OperationResultSource<UT.OperationResult>
) => {
	return async (id: string) => {
		const { data, error } = await getItemById({id});
		
		const arrWithOnlyOneKey = Object.keys(data);

		if(arrWithOnlyOneKey.length > 1){
			throw new Error('WTF, dude? Did you see returned args?');
		}

		const extractedDataBczBadDesignOfTRAMAPI = data[arrWithOnlyOneKey[0]];

		return { data: extractedDataBczBadDesignOfTRAMAPI, error };
	};
};
