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
  username: Scalars['String'];
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
  incrementPlistViews: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  sendPasswordReset: Scalars['Boolean'];
  setPassword: UserResponse;
  updateSong?: Maybe<Song>;
};


export type MutationCreateSongArgs = {
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteSongByIdArgs = {
  id: Scalars['Float'];
};


export type MutationIncrementPlistViewsArgs = {
  id: Scalars['Float'];
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


export type MutationUpdateSongArgs = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  song?: Maybe<Song>;
  songs: Array<Song>;
};


export type QuerySongArgs = {
  id: Scalars['Float'];
};

export type Song = {
  __typename?: 'Song';
  album: Scalars['String'];
  artists: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  isrc: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  spotifyId: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ErrorsFragFragment = { __typename?: 'FieldError', field: string, message: string };

export type NormalUserFragment = { __typename?: 'User', id: number, username: string };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', createdAt: string, id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', createdAt: string, id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };

export type SongsQueryVariables = Exact<{ [key: string]: never; }>;


export type SongsQuery = { __typename?: 'Query', songs: Array<{ __typename?: 'Song', id: number, createdAt: string, updatedAt: string, name: string }> };

export const ErrorsFragFragmentDoc = gql`
    fragment ErrorsFrag on FieldError {
  field
  message
}
    `;
export const NormalUserFragmentDoc = gql`
    fragment NormalUser on User {
  id
  username
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($email: String!, $username: String!, $password: String!) {
  createUser(data: {email: $email, username: $username, passwordHash: $password}) {
    user {
      ...NormalUser
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    ${NormalUserFragmentDoc}`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const LoginDocument = gql`
    mutation login($emailOrUsername: String!, $password: String!) {
  login(data: {emailOrUsername: $emailOrUsername, passwordHash: $password}) {
    user {
      ...NormalUser
      createdAt
    }
    errors {
      field
      message
    }
  }
}
    ${NormalUserFragmentDoc}`;

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
      ...NormalUser
    }
    errors {
      ...ErrorsFrag
    }
  }
}
    ${NormalUserFragmentDoc}
${ErrorsFragFragmentDoc}`;

export function useSetPasswordMutation() {
  return Urql.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...NormalUser
  }
}
    ${NormalUserFragmentDoc}`;

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