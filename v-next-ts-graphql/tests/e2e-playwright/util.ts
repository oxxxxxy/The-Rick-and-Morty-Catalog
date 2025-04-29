import { cwd, platform } from 'node:process';
import path from 'node:path';



export const makeGetCurrentPath = (...givenPathParts: string[]): (v?: string) => string => {
	//check if here path ends on .../v-next-ts-graphql
	//	throw error, if no
	//concat givenPathParts if it exists
	//return getCurrentPath

	const v_next_ts_graphql = 'v-next-ts-graphql';
	const workingDirPath = cwd();
	
	if(
		workingDirPath.slice(
			workingDirPath.length - v_next_ts_graphql.length
		) != v_next_ts_graphql
	){
		throw new Error('current working directory is not the \'v-next-ts-graphql\'');
	}

	let thatValue = '';
	
	if(platform === 'linux'){
		thatValue = path.join(
			workingDirPath,
			'tests',
			'e2e-playwright',
			...givenPathParts
		)
	} else {
		throw new Error(`sorry. nobody will look here.`)
	}
	
	return (v?: string) => {
		if(v){
			return path.join(thatValue, v);
		}
		return thatValue;
	}
}
