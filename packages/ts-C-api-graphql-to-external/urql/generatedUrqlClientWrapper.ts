import type * as UT from '@urql/core';

import type * as GT from './generated.ts';
import * as G from './generated.ts';



interface GeneratedQueries {
	readonly GetCharacter: (options?: GT.GetCharacterQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharacterQuery,UT.AnyVariables>>;
	readonly GetCharacters: (options?: GT.GetCharactersQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharactersQuery,UT.AnyVariables>>;
	readonly GetCharactersByIds: (options?: GT.GetCharactersByIdsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharactersByIdsQuery,UT.AnyVariables>>;
	readonly GetCharactersInfo: (options?: GT.GetCharactersInfoQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharactersInfoQuery,UT.AnyVariables>>;
	readonly GetEpisode: (options?: GT.GetEpisodeQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodeQuery,UT.AnyVariables>>;
	readonly GetEpisodes: (options?: GT.GetEpisodesQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodesQuery,UT.AnyVariables>>;
	readonly GetEpisodesByIds: (options?: GT.GetEpisodesByIdsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodesByIdsQuery,UT.AnyVariables>>;
	readonly GetEpisodesInfo: (options?: GT.GetEpisodesInfoQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodesInfoQuery,UT.AnyVariables>>;
	readonly GetLocation: (options?: GT.GetLocationQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationQuery,UT.AnyVariables>>;
	readonly GetLocations: (options?: GT.GetLocationsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationsQuery,UT.AnyVariables>>;
	readonly GetLocationsByIds: (options?: GT.GetLocationsByIdsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationsByIdsQuery,UT.AnyVariables>>;
	readonly GetLocationsInfo: (options?: GT.GetLocationsInfoQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationsInfoQuery,UT.AnyVariables>>;
}

export interface IUrqlClientWrapper {
	_ : UT.Client;
	q : GeneratedQueries;
}

export class UrqlClientWrapper implements IUrqlClientWrapper{
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
			GetCharactersByIds: (
				options?: GT.GetCharactersByIdsQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetCharactersByIdsQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetCharactersByIdsDocument,
				options
			),
			GetCharactersInfo: (
				options?: GT.GetCharactersInfoQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetCharactersInfoQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetCharactersInfoDocument,
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
			GetEpisodesByIds: (
				options?: GT.GetEpisodesByIdsQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetEpisodesByIdsQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetEpisodesByIdsDocument,
				options
			),
			GetEpisodesInfo: (
				options?: GT.GetEpisodesInfoQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetEpisodesInfoQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetEpisodesInfoDocument,
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
			),
			GetLocationsByIds: (
				options?: GT.GetLocationsByIdsQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetLocationsByIdsQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetLocationsByIdsDocument,
				options
			),
			GetLocationsInfo: (
				options?: GT.GetLocationsInfoQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetLocationsInfoQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetLocationsInfoDocument,
				options
			)

		}
	}

	get _ (): UT.Client{
		return this.urqlClient;
	}

	get q (): GeneratedQueries{
		return this.generatedQueries;
	}
}

export default UrqlClientWrapper;