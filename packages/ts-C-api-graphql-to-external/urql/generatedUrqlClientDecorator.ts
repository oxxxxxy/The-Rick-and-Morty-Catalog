import type * as UT from '@urql/core';

import type * as GT from './generated.ts';
import * as G from './generated.ts';



interface GeneratedQueries {
	readonly GetCharacter: (options?: GT.GetCharacterQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharacterQuery,UT.AnyVariables>>;
	readonly GetCharacters: (options?: GT.GetCharactersQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharactersQuery,UT.AnyVariables>>;
	readonly GetEpisode: (options?: GT.GetEpisodeQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodeQuery,UT.AnyVariables>>;
	readonly GetEpisodes: (options?: GT.GetEpisodesQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodesQuery,UT.AnyVariables>>;
	readonly GetLocation: (options?: GT.GetLocationQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationQuery,UT.AnyVariables>>;
	readonly GetLocations: (options?: GT.GetLocationsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationsQuery,UT.AnyVariables>>;
}

export class UrqlClientDecorator {
	private urqlClient: UT.Client;
	private generatedQueries: GeneratedQueries;

	constructor(instanceOfUrqlClient: UT.Client){
		this.urqlClient = instanceOfUrqlClient;

		this.generatedQueries = {

			GetCharacter: (
				options?: GT.GetCharacterQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetCharacterQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetCharacterDocument,
				options
			),
			GetCharacters: (
				options?: GT.GetCharactersQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetCharactersQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetCharactersDocument,
				options
			),
			GetEpisode: (
				options?: GT.GetEpisodeQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetEpisodeQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetEpisodeDocument,
				options
			),
			GetEpisodes: (
				options?: GT.GetEpisodesQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetEpisodesQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetEpisodesDocument,
				options
			),
			GetLocation: (
				options?: GT.GetLocationQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetLocationQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetLocationDocument,
				options
			),
			GetLocations: (
				options?: GT.GetLocationsQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetLocationsQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetLocationsDocument,
				options
			)

		}
	}

	get _ (): UT.Client{
		return this.urqlClient;
	}

	get q (){
		return this.generatedQueries;
	}
}

export default UrqlClientDecorator;