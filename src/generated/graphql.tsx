import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserInput = {
  email: Scalars['String'];
  passwordHash: Scalars['String'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type ExchangeResponse = {
  __typename?: 'ExchangeResponse';
  error: Scalars['String'];
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  emailOrUsername: Scalars['String'];
  passwordHash: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSong: Song;
  createUser: UserResponse;
  deleteSongById: Scalars['Boolean'];
  exchangeAuthCode: ExchangeResponse;
  getBasicAuthLink: Scalars['String'];
  getCuratorAuthLink: Scalars['String'];
  getNewCuratorToken?: Maybe<Scalars['String']>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  sendPasswordReset: Scalars['Boolean'];
  setPassword: UserResponse;
  setUserPermissions: Scalars['Boolean'];
  updateSong?: Maybe<Song>;
};


export type MutationCreateSongArgs = {
  data: SongData;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteSongByIdArgs = {
  id: Scalars['Float'];
};


export type MutationExchangeAuthCodeArgs = {
  code: Scalars['String'];
  state: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSendPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationSetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSetUserPermissionsArgs = {
  permission: Scalars['String'];
  userIds: Array<Scalars['Int']>;
};


export type MutationUpdateSongArgs = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Playlist = {
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  songs: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
  views?: InputMaybe<Scalars['Float']>;
};

export type PublicSpotify = {
  __typename?: 'PublicSpotify';
  error: Scalars['String'];
  tracks: Array<SpotifyTrack>;
};

export type Query = {
  __typename?: 'Query';
  getUsersTopTracks: PublicSpotify;
  me?: Maybe<User>;
  song?: Maybe<Song>;
  songs: Array<Song>;
  users: Array<User>;
};


export type QueryGetUsersTopTracksArgs = {
  id: Scalars['Int'];
};


export type QuerySongArgs = {
  id: Scalars['Float'];
};

export type Song = {
  __typename?: 'Song';
  album?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  isrc: Scalars['String'];
  name: Scalars['String'];
  playlist: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type SongData = {
  album: Scalars['String'];
  artists: Array<Scalars['String']>;
  isrc: Scalars['String'];
  name: Scalars['String'];
  playlist: Playlist;
};

export enum SpotifyScopes {
  PlaylistReadPrivate = 'playlistReadPrivate',
  UserLibraryModify = 'userLibraryModify',
  UserReadEmail = 'userReadEmail',
  UserReadPrivate = 'userReadPrivate',
  UserReadRecentlyPlayed = 'userReadRecentlyPlayed',
  UserTopRead = 'userTopRead'
}

export type SpotifyTrack = {
  __typename?: 'SpotifyTrack';
  href: Scalars['String'];
  id: Scalars['String'];
  is_local: Scalars['Boolean'];
  is_playable: Scalars['Boolean'];
  name: Scalars['String'];
  popularity: Scalars['Float'];
  preview_url: Scalars['String'];
  track_number: Scalars['Float'];
  type: Scalars['String'];
  uri: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  permission: Scalars['String'];
  profilePhoto?: Maybe<Scalars['String']>;
  spotifyId?: Maybe<Scalars['String']>;
  spotifyRefreshToken?: Maybe<Scalars['String']>;
  spotifyScopes: Array<SpotifyScopes>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ErrorsFragFragment = { __typename?: 'FieldError', field: string, message: string };

export type PrivateUserFragment = { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, permission: string, profilePhoto?: string | null, spotifyId?: string | null, spotifyRefreshToken?: string | null, spotifyScopes: Array<SpotifyScopes> };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, permission: string, profilePhoto?: string | null, spotifyId?: string | null, spotifyRefreshToken?: string | null, spotifyScopes: Array<SpotifyScopes> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ExchangeAuthCodeMutationVariables = Exact<{
  code: Scalars['String'];
  state: Scalars['String'];
}>;


export type ExchangeAuthCodeMutation = { __typename?: 'Mutation', exchangeAuthCode: { __typename?: 'ExchangeResponse', error: string, user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, permission: string, profilePhoto?: string | null, spotifyId?: string | null, spotifyRefreshToken?: string | null, spotifyScopes: Array<SpotifyScopes> } | null } };

export type GetBasicAuthLinkMutationVariables = Exact<{ [key: string]: never; }>;


export type GetBasicAuthLinkMutation = { __typename?: 'Mutation', getBasicAuthLink: string };

export type GetCuratorAuthLinkMutationVariables = Exact<{ [key: string]: never; }>;


export type GetCuratorAuthLinkMutation = { __typename?: 'Mutation', getCuratorAuthLink: string };

export type GetNewCuratorTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type GetNewCuratorTokenMutation = { __typename?: 'Mutation', getNewCuratorToken?: string | null };

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, permission: string, profilePhoto?: string | null, spotifyId?: string | null, spotifyRefreshToken?: string | null, spotifyScopes: Array<SpotifyScopes> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SendPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendPasswordResetMutation = { __typename?: 'Mutation', sendPasswordReset: boolean };

export type SetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, permission: string, profilePhoto?: string | null, spotifyId?: string | null, spotifyRefreshToken?: string | null, spotifyScopes: Array<SpotifyScopes> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SetUserPermissionsMutationVariables = Exact<{
  userIds: Array<Scalars['Int']> | Scalars['Int'];
  permission: Scalars['String'];
}>;


export type SetUserPermissionsMutation = { __typename?: 'Mutation', setUserPermissions: boolean };

export type GetUsersTopTracksQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUsersTopTracksQuery = { __typename?: 'Query', getUsersTopTracks: { __typename?: 'PublicSpotify', tracks: Array<{ __typename?: 'SpotifyTrack', name: string, href: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, permission: string, profilePhoto?: string | null, spotifyId?: string | null, spotifyRefreshToken?: string | null, spotifyScopes: Array<SpotifyScopes> } | null };

export type SongsQueryVariables = Exact<{ [key: string]: never; }>;


export type SongsQuery = { __typename?: 'Query', songs: Array<{ __typename?: 'Song', id: number, createdAt: string, updatedAt: string, name: string }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, permission: string, profilePhoto?: string | null, spotifyId?: string | null, spotifyRefreshToken?: string | null, spotifyScopes: Array<SpotifyScopes> }> };

export const ErrorsFragFragmentDoc = gql`
    fragment ErrorsFrag on FieldError {
  field
  message
}
    `;
export const PrivateUserFragmentDoc = gql`
    fragment PrivateUser on User {
  id
  createdAt
  updatedAt
  username
  permission
  profilePhoto
  spotifyId
  spotifyRefreshToken
  spotifyScopes
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($email: String!, $username: String!, $password: String!, $token: String!) {
  createUser(
    data: {email: $email, username: $username, passwordHash: $password, token: $token}
  ) {
    user {
      ...PrivateUser
    }
    errors {
      field
      message
    }
  }
}
    ${PrivateUserFragmentDoc}`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const ExchangeAuthCodeDocument = gql`
    mutation exchangeAuthCode($code: String!, $state: String!) {
  exchangeAuthCode(code: $code, state: $state) {
    user {
      ...PrivateUser
    }
    error
  }
}
    ${PrivateUserFragmentDoc}`;

export function useExchangeAuthCodeMutation() {
  return Urql.useMutation<ExchangeAuthCodeMutation, ExchangeAuthCodeMutationVariables>(ExchangeAuthCodeDocument);
};
export const GetBasicAuthLinkDocument = gql`
    mutation getBasicAuthLink {
  getBasicAuthLink
}
    `;

export function useGetBasicAuthLinkMutation() {
  return Urql.useMutation<GetBasicAuthLinkMutation, GetBasicAuthLinkMutationVariables>(GetBasicAuthLinkDocument);
};
export const GetCuratorAuthLinkDocument = gql`
    mutation getCuratorAuthLink {
  getCuratorAuthLink
}
    `;

export function useGetCuratorAuthLinkMutation() {
  return Urql.useMutation<GetCuratorAuthLinkMutation, GetCuratorAuthLinkMutationVariables>(GetCuratorAuthLinkDocument);
};
export const GetNewCuratorTokenDocument = gql`
    mutation getNewCuratorToken {
  getNewCuratorToken
}
    `;

export function useGetNewCuratorTokenMutation() {
  return Urql.useMutation<GetNewCuratorTokenMutation, GetNewCuratorTokenMutationVariables>(GetNewCuratorTokenDocument);
};
export const LoginDocument = gql`
    mutation login($emailOrUsername: String!, $password: String!) {
  login(data: {emailOrUsername: $emailOrUsername, passwordHash: $password}) {
    user {
      ...PrivateUser
    }
    errors {
      field
      message
    }
  }
}
    ${PrivateUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SendPasswordResetDocument = gql`
    mutation sendPasswordReset($email: String!) {
  sendPasswordReset(email: $email)
}
    `;

export function useSendPasswordResetMutation() {
  return Urql.useMutation<SendPasswordResetMutation, SendPasswordResetMutationVariables>(SendPasswordResetDocument);
};
export const SetPasswordDocument = gql`
    mutation setPassword($token: String!, $newPassword: String!) {
  setPassword(token: $token, newPassword: $newPassword) {
    user {
      ...PrivateUser
    }
    errors {
      ...ErrorsFrag
    }
  }
}
    ${PrivateUserFragmentDoc}
${ErrorsFragFragmentDoc}`;

export function useSetPasswordMutation() {
  return Urql.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument);
};
export const SetUserPermissionsDocument = gql`
    mutation setUserPermissions($userIds: [Int!]!, $permission: String!) {
  setUserPermissions(userIds: $userIds, permission: $permission)
}
    `;

export function useSetUserPermissionsMutation() {
  return Urql.useMutation<SetUserPermissionsMutation, SetUserPermissionsMutationVariables>(SetUserPermissionsDocument);
};
export const GetUsersTopTracksDocument = gql`
    query getUsersTopTracks($id: Int!) {
  getUsersTopTracks(id: $id) {
    tracks {
      name
      href
    }
  }
}
    `;

export function useGetUsersTopTracksQuery(options: Omit<Urql.UseQueryArgs<GetUsersTopTracksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersTopTracksQuery, GetUsersTopTracksQueryVariables>({ query: GetUsersTopTracksDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...PrivateUser
  }
}
    ${PrivateUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const SongsDocument = gql`
    query songs {
  songs {
    id
    createdAt
    updatedAt
    name
  }
}
    `;

export function useSongsQuery(options?: Omit<Urql.UseQueryArgs<SongsQueryVariables>, 'query'>) {
  return Urql.useQuery<SongsQuery, SongsQueryVariables>({ query: SongsDocument, ...options });
};
export const UsersDocument = gql`
    query users {
  users {
    ...PrivateUser
  }
}
    ${PrivateUserFragmentDoc}`;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};