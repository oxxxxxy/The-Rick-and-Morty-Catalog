import type * as UT from '@urql/core';

import type * as GT from './generated.ts';
import * as G from './generated.ts';




export type GetCharacterFn = (options?: GT.GetCharacterQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharacterQuery,UT.AnyVariables>>;
export type GetCharactersFn = (options?: GT.GetCharactersQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharactersQuery,UT.AnyVariables>>;
export type GetCharactersByIdsFn = (options?: GT.GetCharactersByIdsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharactersByIdsQuery,UT.AnyVariables>>;
export type GetCharactersInfoFn = (options?: GT.GetCharactersInfoQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetCharactersInfoQuery,UT.AnyVariables>>;
export type GetEpisodeFn = (options?: GT.GetEpisodeQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodeQuery,UT.AnyVariables>>;
export type GetEpisodesFn = (options?: GT.GetEpisodesQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodesQuery,UT.AnyVariables>>;
export type GetEpisodesByIdsFn = (options?: GT.GetEpisodesByIdsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodesByIdsQuery,UT.AnyVariables>>;
export type GetEpisodesInfoFn = (options?: GT.GetEpisodesInfoQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetEpisodesInfoQuery,UT.AnyVariables>>;
export type GetLocationFn = (options?: GT.GetLocationQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationQuery,UT.AnyVariables>>;
export type GetLocationsFn = (options?: GT.GetLocationsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationsQuery,UT.AnyVariables>>;
export type GetLocationsByIdsFn = (options?: GT.GetLocationsByIdsQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationsByIdsQuery,UT.AnyVariables>>;
export type GetLocationsInfoFn = (options?: GT.GetLocationsInfoQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetLocationsInfoQuery,UT.AnyVariables>>;
export type GetPreviewCharacterFn = (options?: GT.GetPreviewCharacterQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetPreviewCharacterQuery,UT.AnyVariables>>;
export type GetPreviewEpisodeFn = (options?: GT.GetPreviewEpisodeQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetPreviewEpisodeQuery,UT.AnyVariables>>;
export type GetPreviewLocationFn = (options?: GT.GetPreviewLocationQueryVariables) => UT.OperationResultSource<UT.OperationResult<GT.GetPreviewLocationQuery,UT.AnyVariables>>;

export interface GeneratedQueries {
	readonly GetCharacter: GetCharacterFn
	readonly GetCharacters: GetCharactersFn
	readonly GetCharactersByIds: GetCharactersByIdsFn
	readonly GetCharactersInfo: GetCharactersInfoFn
	readonly GetEpisode: GetEpisodeFn
	readonly GetEpisodes: GetEpisodesFn
	readonly GetEpisodesByIds: GetEpisodesByIdsFn
	readonly GetEpisodesInfo: GetEpisodesInfoFn
	readonly GetLocation: GetLocationFn
	readonly GetLocations: GetLocationsFn
	readonly GetLocationsByIds: GetLocationsByIdsFn
	readonly GetLocationsInfo: GetLocationsInfoFn
	readonly GetPreviewCharacter: GetPreviewCharacterFn
	readonly GetPreviewEpisode: GetPreviewEpisodeFn
	readonly GetPreviewLocation: GetPreviewLocationFn
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
			),
			GetPreviewCharacter: (
				options?: GT.GetPreviewCharacterQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetPreviewCharacterQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetPreviewCharacterDocument,
				options
			),
			GetPreviewEpisode: (
				options?: GT.GetPreviewEpisodeQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetPreviewEpisodeQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetPreviewEpisodeDocument,
				options
			),
			GetPreviewLocation: (
				options?: GT.GetPreviewLocationQueryVariables
			): UT.OperationResultSource<
				UT.OperationResult<
					GT.GetPreviewLocationQuery,
					UT.AnyVariables
				>
			> => instanceOfUrqlClient.query(
				G.GetPreviewLocationDocument,
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