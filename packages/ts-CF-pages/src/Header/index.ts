import { URL__RICKANDMORTYAPI } from '@tsCF/data';
import type { IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';




export const noProtocolLink = URL__RICKANDMORTYAPI.replace(/^.+:\/\//, '');


export const cssClass_serverStatusIcon_OK = 'server-status-icon_OK'; 
export const cssClass_serverStatusIcon_ERR = 'server-status-icon_ERR';

export const getCssClassOKorERR = (bool: boolean): string => (
	bool
	? cssClass_serverStatusIcon_OK
	: cssClass_serverStatusIcon_ERR
);


export const checkServerStatus = async (wUrql: IUrqlClientWrapper) => {
	const { data } = await wUrql.q.GetCharacter({id: '1'});
	
	return getCssClassOKorERR(!!data);
}
