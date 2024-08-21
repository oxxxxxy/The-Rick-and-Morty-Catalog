import type { UT } from '@tsC/api-graphql-to-ex';

import type {	QueryParamCompatible_Base } from '@tsLF/forURLSP';

import type {
	ArgumentsFor_SearchPageDrawer_drawDataFromReq,
	ArgumentsFor_SearchPageManager_requestFn,
	TempPropsOfTileBoard_SearchValue
} from '@tsLF/pages';




export const makeFnForSearchPageManagerWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer = (
		makeArgumentsFor_GetItems: (v: QueryParamCompatible_Base[]) => Object,
		wUrql_q_GetItems: (v: Object) => UT.OperationResultSource<UT.OperationResult>,
		prepareArgsForFnThrowToDrawerFromGetReq: (v: UT.OperationResult) => ArgumentsFor_SearchPageDrawer_drawDataFromReq
	): ArgumentsFor_SearchPageManager_requestFn => {
	return (
		qpcList: QueryParamCompatible_Base[],
		throwPreparedArgsToSearchPageDrawer: (v: Object) => void
	): (() => void) => {
		const args = makeArgumentsFor_GetItems(qpcList);

		const { unsubscribe } = wUrql_q_GetItems(args)
			.subscribe(
			(res: UT.OperationResult) => {
				const args = prepareArgsForFnThrowToDrawerFromGetReq(res);

				throwPreparedArgsToSearchPageDrawer(args);
			}
		);

		return unsubscribe;
	}
};



export const makeFnPrepareArgsForFnThrowToDrawerFromGetReq = (thatPropName: string): ((v: UT.OperationResult) => ArgumentsFor_SearchPageDrawer_drawDataFromReq) => {
	return (v: UT.OperationResult): ArgumentsFor_SearchPageDrawer_drawDataFromReq => {
		const { data, error } = v;
		
		const args: ArgumentsFor_SearchPageDrawer_drawDataFromReq = {
			error
		};

		if(data){
			const { info, results } = data[thatPropName];


			if(!info.pages){
				return args;
			}

			const tempPropsOfTileBoard_SearchValue: TempPropsOfTileBoard_SearchValue = {
				pageCount: info.pages,
				availableItemsCount: info.count
			};

			if(info.next){
				tempPropsOfTileBoard_SearchValue.selectedPage = info.next - 1;
			}else if(info.prev){
				tempPropsOfTileBoard_SearchValue.selectedPage = info.prev + 1;
			}


			args.data = {
				tempPropsOfTileBoard_SearchValue,
				dataForTilesList: results
			}
		}
		
		return args;
	};
};
