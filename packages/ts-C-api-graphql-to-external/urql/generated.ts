import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Upload: { input: any; output: any };
};

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type Character = {
  __typename?: "Character";
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars["String"]["output"]>;
  /** Episodes in which this character appeared. */
  episode: Array<Maybe<Episode>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars["String"]["output"]>;
  /** The id of the character. */
  id?: Maybe<Scalars["ID"]["output"]>;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars["String"]["output"]>;
  /** The character's last known location */
  location?: Maybe<Location>;
  /** The name of the character. */
  name?: Maybe<Scalars["String"]["output"]>;
  /** The character's origin location */
  origin?: Maybe<Location>;
  /** The species of the character. */
  species?: Maybe<Scalars["String"]["output"]>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars["String"]["output"]>;
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars["String"]["output"]>;
};

export type Characters = {
  __typename?: "Characters";
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type Episode = {
  __typename?: "Episode";
  /** The air date of the episode. */
  air_date?: Maybe<Scalars["String"]["output"]>;
  /** List of characters who have been seen in the episode. */
  characters: Array<Maybe<Character>>;
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars["String"]["output"]>;
  /** The code of the episode. */
  episode?: Maybe<Scalars["String"]["output"]>;
  /** The id of the episode. */
  id?: Maybe<Scalars["ID"]["output"]>;
  /** The name of the episode. */
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Episodes = {
  __typename?: "Episodes";
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Episode>>>;
};

export type FilterCharacter = {
  gender?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  species?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type FilterEpisode = {
  episode?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type FilterLocation = {
  dimension?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type Info = {
  __typename?: "Info";
  /** The length of the response. */
  count?: Maybe<Scalars["Int"]["output"]>;
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars["Int"]["output"]>;
  /** The amount of pages. */
  pages?: Maybe<Scalars["Int"]["output"]>;
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars["Int"]["output"]>;
};

export type Location = {
  __typename?: "Location";
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars["String"]["output"]>;
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars["String"]["output"]>;
  /** The id of the location. */
  id?: Maybe<Scalars["ID"]["output"]>;
  /** The name of the location. */
  name?: Maybe<Scalars["String"]["output"]>;
  /** List of characters who have been last seen in the location. */
  residents: Array<Maybe<Character>>;
  /** The type of the location. */
  type?: Maybe<Scalars["String"]["output"]>;
};

export type Locations = {
  __typename?: "Locations";
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Location>>>;
};

export type Query = {
  __typename?: "Query";
  /** Get a specific character by ID */
  character?: Maybe<Character>;
  /** Get the list of all characters */
  characters?: Maybe<Characters>;
  /** Get a list of characters selected by ids */
  charactersByIds?: Maybe<Array<Maybe<Character>>>;
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>;
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>;
  /** Get a list of episodes selected by ids */
  episodesByIds?: Maybe<Array<Maybe<Episode>>>;
  /** Get a specific locations by ID */
  location?: Maybe<Location>;
  /** Get the list of all locations */
  locations?: Maybe<Locations>;
  /** Get a list of locations selected by ids */
  locationsByIds?: Maybe<Array<Maybe<Location>>>;
};

export type QueryCharacterArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryCharactersByIdsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type QueryEpisodeArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryEpisodesArgs = {
  filter?: InputMaybe<FilterEpisode>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryEpisodesByIdsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type QueryLocationArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type CharacterFieldsFragment = {
  __typename?: "Character";
  id?: string | null;
  name?: string | null;
  status?: string | null;
  species?: string | null;
  type?: string | null;
  gender?: string | null;
  image?: string | null;
  episode: Array<{
    __typename?: "Episode";
    id?: string | null;
    name?: string | null;
    air_date?: string | null;
    episode?: string | null;
  } | null>;
  origin?: {
    __typename?: "Location";
    id?: string | null;
    name?: string | null;
    type?: string | null;
    dimension?: string | null;
  } | null;
  location?: {
    __typename?: "Location";
    id?: string | null;
    name?: string | null;
    type?: string | null;
    dimension?: string | null;
  } | null;
};

export type CharacterPreviewFieldsFragment = {
  __typename?: "Character";
  id?: string | null;
  name?: string | null;
  status?: string | null;
  species?: string | null;
  type?: string | null;
  gender?: string | null;
  image?: string | null;
  origin?: {
    __typename?: "Location";
    id?: string | null;
    name?: string | null;
    type?: string | null;
    dimension?: string | null;
  } | null;
  location?: {
    __typename?: "Location";
    id?: string | null;
    name?: string | null;
    type?: string | null;
    dimension?: string | null;
  } | null;
  episode: Array<{
    __typename?: "Episode";
    id?: string | null;
    name?: string | null;
    air_date?: string | null;
    episode?: string | null;
  } | null>;
};

export type EpisodeFieldsFragment = {
  __typename?: "Episode";
  id?: string | null;
  name?: string | null;
  air_date?: string | null;
  episode?: string | null;
  characters: Array<{
    __typename?: "Character";
    id?: string | null;
    name?: string | null;
    status?: string | null;
    species?: string | null;
    type?: string | null;
    gender?: string | null;
    image?: string | null;
    origin?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
    location?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
    episode: Array<{
      __typename?: "Episode";
      id?: string | null;
      name?: string | null;
      air_date?: string | null;
      episode?: string | null;
    } | null>;
  } | null>;
};

export type EpisodePreviewFieldsFragment = {
  __typename?: "Episode";
  id?: string | null;
  name?: string | null;
  air_date?: string | null;
  episode?: string | null;
};

export type InfoFieldsFragment = {
  __typename?: "Info";
  count?: number | null;
  pages?: number | null;
  next?: number | null;
  prev?: number | null;
};

export type LocationFieldsFragment = {
  __typename?: "Location";
  id?: string | null;
  name?: string | null;
  type?: string | null;
  dimension?: string | null;
  residents: Array<{
    __typename?: "Character";
    id?: string | null;
    name?: string | null;
    status?: string | null;
    species?: string | null;
    type?: string | null;
    gender?: string | null;
    image?: string | null;
    origin?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
    location?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
    episode: Array<{
      __typename?: "Episode";
      id?: string | null;
      name?: string | null;
      air_date?: string | null;
      episode?: string | null;
    } | null>;
  } | null>;
};

export type LocationPreviewFieldsFragment = {
  __typename?: "Location";
  id?: string | null;
  name?: string | null;
  type?: string | null;
  dimension?: string | null;
};

export type GetCharacterQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetCharacterQuery = {
  __typename?: "Query";
  character?: {
    __typename?: "Character";
    id?: string | null;
    name?: string | null;
    status?: string | null;
    species?: string | null;
    type?: string | null;
    gender?: string | null;
    image?: string | null;
    episode: Array<{
      __typename?: "Episode";
      id?: string | null;
      name?: string | null;
      air_date?: string | null;
      episode?: string | null;
    } | null>;
    origin?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
    location?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
  } | null;
};

export type GetCharactersQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<FilterCharacter>;
}>;

export type GetCharactersQuery = {
  __typename?: "Query";
  characters?: {
    __typename?: "Characters";
    info?: {
      __typename?: "Info";
      count?: number | null;
      pages?: number | null;
      next?: number | null;
      prev?: number | null;
    } | null;
    results?: Array<{
      __typename?: "Character";
      id?: string | null;
      name?: string | null;
      status?: string | null;
      species?: string | null;
      type?: string | null;
      gender?: string | null;
      image?: string | null;
      origin?: {
        __typename?: "Location";
        id?: string | null;
        name?: string | null;
        type?: string | null;
        dimension?: string | null;
      } | null;
      location?: {
        __typename?: "Location";
        id?: string | null;
        name?: string | null;
        type?: string | null;
        dimension?: string | null;
      } | null;
      episode: Array<{
        __typename?: "Episode";
        id?: string | null;
        name?: string | null;
        air_date?: string | null;
        episode?: string | null;
      } | null>;
    } | null> | null;
  } | null;
};

export type GetCharactersByIdsQueryVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type GetCharactersByIdsQuery = {
  __typename?: "Query";
  charactersByIds?: Array<{
    __typename?: "Character";
    id?: string | null;
    name?: string | null;
    status?: string | null;
    species?: string | null;
    type?: string | null;
    gender?: string | null;
    image?: string | null;
    origin?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
    location?: {
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null;
    episode: Array<{
      __typename?: "Episode";
      id?: string | null;
      name?: string | null;
      air_date?: string | null;
      episode?: string | null;
    } | null>;
  } | null> | null;
};

export type GetCharactersInfoQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<FilterCharacter>;
}>;

export type GetCharactersInfoQuery = {
  __typename?: "Query";
  characters?: {
    __typename?: "Characters";
    info?: {
      __typename?: "Info";
      count?: number | null;
      pages?: number | null;
      next?: number | null;
      prev?: number | null;
    } | null;
  } | null;
};

export type GetEpisodeQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetEpisodeQuery = {
  __typename?: "Query";
  episode?: {
    __typename?: "Episode";
    id?: string | null;
    name?: string | null;
    air_date?: string | null;
    episode?: string | null;
    characters: Array<{
      __typename?: "Character";
      id?: string | null;
      name?: string | null;
      status?: string | null;
      species?: string | null;
      type?: string | null;
      gender?: string | null;
      image?: string | null;
      origin?: {
        __typename?: "Location";
        id?: string | null;
        name?: string | null;
        type?: string | null;
        dimension?: string | null;
      } | null;
      location?: {
        __typename?: "Location";
        id?: string | null;
        name?: string | null;
        type?: string | null;
        dimension?: string | null;
      } | null;
      episode: Array<{
        __typename?: "Episode";
        id?: string | null;
        name?: string | null;
        air_date?: string | null;
        episode?: string | null;
      } | null>;
    } | null>;
  } | null;
};

export type GetEpisodesQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<FilterEpisode>;
}>;

export type GetEpisodesQuery = {
  __typename?: "Query";
  episodes?: {
    __typename?: "Episodes";
    info?: {
      __typename?: "Info";
      count?: number | null;
      pages?: number | null;
      next?: number | null;
      prev?: number | null;
    } | null;
    results?: Array<{
      __typename?: "Episode";
      id?: string | null;
      name?: string | null;
      air_date?: string | null;
      episode?: string | null;
    } | null> | null;
  } | null;
};

export type GetEpisodesByIdsQueryVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type GetEpisodesByIdsQuery = {
  __typename?: "Query";
  episodesByIds?: Array<{
    __typename?: "Episode";
    id?: string | null;
    name?: string | null;
    air_date?: string | null;
    episode?: string | null;
  } | null> | null;
};

export type GetEpisodesInfoQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<FilterEpisode>;
}>;

export type GetEpisodesInfoQuery = {
  __typename?: "Query";
  episodes?: {
    __typename?: "Episodes";
    info?: {
      __typename?: "Info";
      count?: number | null;
      pages?: number | null;
      next?: number | null;
      prev?: number | null;
    } | null;
  } | null;
};

export type GetLocationQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetLocationQuery = {
  __typename?: "Query";
  location?: {
    __typename?: "Location";
    id?: string | null;
    name?: string | null;
    type?: string | null;
    dimension?: string | null;
    residents: Array<{
      __typename?: "Character";
      id?: string | null;
      name?: string | null;
      status?: string | null;
      species?: string | null;
      type?: string | null;
      gender?: string | null;
      image?: string | null;
      origin?: {
        __typename?: "Location";
        id?: string | null;
        name?: string | null;
        type?: string | null;
        dimension?: string | null;
      } | null;
      location?: {
        __typename?: "Location";
        id?: string | null;
        name?: string | null;
        type?: string | null;
        dimension?: string | null;
      } | null;
      episode: Array<{
        __typename?: "Episode";
        id?: string | null;
        name?: string | null;
        air_date?: string | null;
        episode?: string | null;
      } | null>;
    } | null>;
  } | null;
};

export type GetLocationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<FilterLocation>;
}>;

export type GetLocationsQuery = {
  __typename?: "Query";
  locations?: {
    __typename?: "Locations";
    info?: {
      __typename?: "Info";
      count?: number | null;
      pages?: number | null;
      next?: number | null;
      prev?: number | null;
    } | null;
    results?: Array<{
      __typename?: "Location";
      id?: string | null;
      name?: string | null;
      type?: string | null;
      dimension?: string | null;
    } | null> | null;
  } | null;
};

export type GetLocationsByIdsQueryVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type GetLocationsByIdsQuery = {
  __typename?: "Query";
  locationsByIds?: Array<{
    __typename?: "Location";
    id?: string | null;
    name?: string | null;
    type?: string | null;
    dimension?: string | null;
  } | null> | null;
};

export type GetLocationsInfoQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<FilterLocation>;
}>;

export type GetLocationsInfoQuery = {
  __typename?: "Query";
  locations?: {
    __typename?: "Locations";
    info?: {
      __typename?: "Info";
      count?: number | null;
      pages?: number | null;
      next?: number | null;
      prev?: number | null;
    } | null;
  } | null;
};

export const LocationPreviewFieldsFragmentDoc = gql`
  fragment LocationPreviewFields on Location {
    id
    name
    type
    dimension
  }
`;
export const EpisodePreviewFieldsFragmentDoc = gql`
  fragment EpisodePreviewFields on Episode {
    id
    name
    air_date
    episode
  }
`;
export const CharacterPreviewFieldsFragmentDoc = gql`
  fragment CharacterPreviewFields on Character {
    id
    name
    status
    species
    type
    gender
    image
    origin {
      ...LocationPreviewFields
    }
    location {
      ...LocationPreviewFields
    }
    episode {
      ...EpisodePreviewFields
    }
  }
  ${LocationPreviewFieldsFragmentDoc}
  ${EpisodePreviewFieldsFragmentDoc}
`;
export const CharacterFieldsFragmentDoc = gql`
  fragment CharacterFields on Character {
    ...CharacterPreviewFields
    episode {
      ...EpisodePreviewFields
    }
  }
  ${CharacterPreviewFieldsFragmentDoc}
  ${EpisodePreviewFieldsFragmentDoc}
`;
export const EpisodeFieldsFragmentDoc = gql`
  fragment EpisodeFields on Episode {
    ...EpisodePreviewFields
    characters {
      ...CharacterPreviewFields
    }
  }
  ${EpisodePreviewFieldsFragmentDoc}
  ${CharacterPreviewFieldsFragmentDoc}
`;
export const InfoFieldsFragmentDoc = gql`
  fragment InfoFields on Info {
    count
    pages
    next
    prev
  }
`;
export const LocationFieldsFragmentDoc = gql`
  fragment LocationFields on Location {
    ...LocationPreviewFields
    residents {
      ...CharacterPreviewFields
    }
  }
  ${LocationPreviewFieldsFragmentDoc}
  ${CharacterPreviewFieldsFragmentDoc}
`;
export const GetCharacterDocument = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      ...CharacterFields
    }
  }
  ${CharacterFieldsFragmentDoc}
`;

export function useGetCharacterQuery(
  options: Omit<Urql.UseQueryArgs<GetCharacterQueryVariables>, "query">,
) {
  return Urql.useQuery<GetCharacterQuery, GetCharacterQueryVariables>({
    query: GetCharacterDocument,
    ...options,
  });
}
export const GetCharactersDocument = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        ...InfoFields
      }
      results {
        ...CharacterPreviewFields
      }
    }
  }
  ${InfoFieldsFragmentDoc}
  ${CharacterPreviewFieldsFragmentDoc}
`;

export function useGetCharactersQuery(
  options?: Omit<Urql.UseQueryArgs<GetCharactersQueryVariables>, "query">,
) {
  return Urql.useQuery<GetCharactersQuery, GetCharactersQueryVariables>({
    query: GetCharactersDocument,
    ...options,
  });
}
export const GetCharactersByIdsDocument = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      ...CharacterPreviewFields
    }
  }
  ${CharacterPreviewFieldsFragmentDoc}
`;

export function useGetCharactersByIdsQuery(
  options: Omit<Urql.UseQueryArgs<GetCharactersByIdsQueryVariables>, "query">,
) {
  return Urql.useQuery<
    GetCharactersByIdsQuery,
    GetCharactersByIdsQueryVariables
  >({ query: GetCharactersByIdsDocument, ...options });
}
export const GetCharactersInfoDocument = gql`
  query GetCharactersInfo($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        ...InfoFields
      }
    }
  }
  ${InfoFieldsFragmentDoc}
`;

export function useGetCharactersInfoQuery(
  options?: Omit<Urql.UseQueryArgs<GetCharactersInfoQueryVariables>, "query">,
) {
  return Urql.useQuery<GetCharactersInfoQuery, GetCharactersInfoQueryVariables>(
    { query: GetCharactersInfoDocument, ...options },
  );
}
export const GetEpisodeDocument = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      ...EpisodeFields
    }
  }
  ${EpisodeFieldsFragmentDoc}
`;

export function useGetEpisodeQuery(
  options: Omit<Urql.UseQueryArgs<GetEpisodeQueryVariables>, "query">,
) {
  return Urql.useQuery<GetEpisodeQuery, GetEpisodeQueryVariables>({
    query: GetEpisodeDocument,
    ...options,
  });
}
export const GetEpisodesDocument = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        ...InfoFields
      }
      results {
        ...EpisodePreviewFields
      }
    }
  }
  ${InfoFieldsFragmentDoc}
  ${EpisodePreviewFieldsFragmentDoc}
`;

export function useGetEpisodesQuery(
  options?: Omit<Urql.UseQueryArgs<GetEpisodesQueryVariables>, "query">,
) {
  return Urql.useQuery<GetEpisodesQuery, GetEpisodesQueryVariables>({
    query: GetEpisodesDocument,
    ...options,
  });
}
export const GetEpisodesByIdsDocument = gql`
  query GetEpisodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      ...EpisodePreviewFields
    }
  }
  ${EpisodePreviewFieldsFragmentDoc}
`;

export function useGetEpisodesByIdsQuery(
  options: Omit<Urql.UseQueryArgs<GetEpisodesByIdsQueryVariables>, "query">,
) {
  return Urql.useQuery<GetEpisodesByIdsQuery, GetEpisodesByIdsQueryVariables>({
    query: GetEpisodesByIdsDocument,
    ...options,
  });
}
export const GetEpisodesInfoDocument = gql`
  query GetEpisodesInfo($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        ...InfoFields
      }
    }
  }
  ${InfoFieldsFragmentDoc}
`;

export function useGetEpisodesInfoQuery(
  options?: Omit<Urql.UseQueryArgs<GetEpisodesInfoQueryVariables>, "query">,
) {
  return Urql.useQuery<GetEpisodesInfoQuery, GetEpisodesInfoQueryVariables>({
    query: GetEpisodesInfoDocument,
    ...options,
  });
}
export const GetLocationDocument = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      ...LocationFields
    }
  }
  ${LocationFieldsFragmentDoc}
`;

export function useGetLocationQuery(
  options: Omit<Urql.UseQueryArgs<GetLocationQueryVariables>, "query">,
) {
  return Urql.useQuery<GetLocationQuery, GetLocationQueryVariables>({
    query: GetLocationDocument,
    ...options,
  });
}
export const GetLocationsDocument = gql`
  query GetLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        ...InfoFields
      }
      results {
        ...LocationPreviewFields
      }
    }
  }
  ${InfoFieldsFragmentDoc}
  ${LocationPreviewFieldsFragmentDoc}
`;

export function useGetLocationsQuery(
  options?: Omit<Urql.UseQueryArgs<GetLocationsQueryVariables>, "query">,
) {
  return Urql.useQuery<GetLocationsQuery, GetLocationsQueryVariables>({
    query: GetLocationsDocument,
    ...options,
  });
}
export const GetLocationsByIdsDocument = gql`
  query GetLocationsByIds($ids: [ID!]!) {
    locationsByIds(ids: $ids) {
      ...LocationPreviewFields
    }
  }
  ${LocationPreviewFieldsFragmentDoc}
`;

export function useGetLocationsByIdsQuery(
  options: Omit<Urql.UseQueryArgs<GetLocationsByIdsQueryVariables>, "query">,
) {
  return Urql.useQuery<GetLocationsByIdsQuery, GetLocationsByIdsQueryVariables>(
    { query: GetLocationsByIdsDocument, ...options },
  );
}
export const GetLocationsInfoDocument = gql`
  query GetLocationsInfo($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        ...InfoFields
      }
    }
  }
  ${InfoFieldsFragmentDoc}
`;

export function useGetLocationsInfoQuery(
  options?: Omit<Urql.UseQueryArgs<GetLocationsInfoQueryVariables>, "query">,
) {
  return Urql.useQuery<GetLocationsInfoQuery, GetLocationsInfoQueryVariables>({
    query: GetLocationsInfoDocument,
    ...options,
  });
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
