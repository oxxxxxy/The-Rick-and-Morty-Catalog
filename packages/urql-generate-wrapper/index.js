import { 
	readFileSync,
	accessSync,
	constants,
	writeFileSync
} from 'node:fs';
import path from 'node:path';


const addNewLine = (count = 1) => {
	let string = '';

	for(let i = 0; i < count; i++){
		string += '\n';
	}

	return string;
};

const getImportLines = generatedScriptByCodegenPathFile =>
`import type * as UT from '@urql/core';

import type * as GT from '${generatedScriptByCodegenPathFile}';
import * as G from '${generatedScriptByCodegenPathFile}';`
	+ addNewLine(4);

const getInterfaceGeneratedQueriesProp = NameOfGraphqlQuery => `	readonly ${NameOfGraphqlQuery}: (options?: GT.${NameOfGraphqlQuery}QueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.${NameOfGraphqlQuery}Query,UT.AnyVariables>>;`;

const getInterfaceGeneratedQueries = NameOfGraphqlQueryArr => {
	let text = `interface GeneratedQueries {\n`;

	NameOfGraphqlQueryArr.forEach(e => {
		text += getInterfaceGeneratedQueriesProp(e) + '\n';
	});

	return text += '}';
};

const getHeadOfDecorator = () => 
`export interface IUrqlClientWrapper {
	_ : UT.Client;
	q : GeneratedQueries;
}

export class UrqlClientWrapper implements IUrqlClientWrapper{
	private urqlClient: UT.Client;
	private generatedQueries: GeneratedQueries;

	constructor(instanceOfUrqlClient: UT.Client){
		this.urqlClient = instanceOfUrqlClient;

		this.generatedQueries = {`;

const getGeneratedQueryFn = NameOfGraphqlQuery =>
`			${NameOfGraphqlQuery}: (
				options?: GT.${NameOfGraphqlQuery}QueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.${NameOfGraphqlQuery}Query,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.${NameOfGraphqlQuery}Document,
				options
			)`;

const getGeneratedQueryFns = NamesOfGraphqlQueries => {
	NamesOfGraphqlQueries = NamesOfGraphqlQueries.map(e => 
		getGeneratedQueryFn(e)
	);

	return NamesOfGraphqlQueries.join(',\n');
};

const getFooterOfDecorator = () => 
`		}
	}

	get _ (): UT.Client{
		return this.urqlClient;
	}

	get q (): GeneratedQueries{
		return this.generatedQueries;
	}
}

export default UrqlClientWrapper;`;


export const makeUrqlClientDecoratorScript = (
		generatedScriptByCodegenPathFile,
		exitPathFile
	) => {

	accessSync(generatedScriptByCodegenPathFile, constants.R_OK);
	accessSync(
		exitPathFile.replace(
			path.posix.basename(exitPathFile),
			''
		),
		constants.W_OK
	);

	
	const generatedScript = readFileSync(
		generatedScriptByCodegenPathFile,
		'utf8'
	);


	const NamesOfGraphqlQueries = [...generatedScript.matchAll(/const (.+)Document/gm)]
		.map(e => e[1]);
	

	const decoratorScript = getImportLines(generatedScriptByCodegenPathFile)
	+ getInterfaceGeneratedQueries(NamesOfGraphqlQueries)
	+ addNewLine(2)
	+ getHeadOfDecorator()
	+ addNewLine(2)
	+ getGeneratedQueryFns(NamesOfGraphqlQueries)
	+ addNewLine(2)
	+ getFooterOfDecorator();


	writeFileSync(exitPathFile, decoratorScript);
}

export default makeUrqlClientDecoratorScript;
