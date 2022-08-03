import { Cache, QueryInput, cacheExchange } from "@urql/exchange-graphcache";
import { CreateUserMutation, ExchangeAuthCodeMutation, LoginMutation, LogoutMutation, MeDocument, MeQuery, SetUserPermissionsMutation, UsersDocument, UsersQuery, useUsersQuery } from '../generated/graphql';
import { createClient, dedupExchange, errorExchange, fetchExchange } from 'urql';

import Router from "next/router";

function typedUpdateQuery<Result, Query> (
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query
) {
	return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}

export const createUrqlClient = (ssrExchange:any) => ({
	url: 'http://localhost:3001/graphql',
	fetchOptions: { credentials: "include" } as const,
	exchanges: [
		dedupExchange,
		cacheExchange({
			updates: {
				Mutation: {
					setUserPermissions: (_result, _args, cache, _info) => {
						cache.invalidate({ __typename: 'Query' }, 'users')
					},
					createUser: (result, _args, cache, _info) => {
						typedUpdateQuery<CreateUserMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							result,
							(res, query) => {
								if (res.createUser.errors) return query

								query.me = res.createUser.user
								return query
							}
						)
					},
					login: (result, _args, cache, _info) => {
						typedUpdateQuery<LoginMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							result,
							(res, query) => {
								if (res.login.errors) return query

								query.me = res.login.user
								return query
							}
						);
					},
					logout: (result, _args, cache, _info) => {
						typedUpdateQuery<LogoutMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							result,
							() => ({ me: null })
						);
					}
				}
			}
		}),
		ssrExchange,
		errorExchange({
			onError(error) {
				if (error.message.includes("Not authenticated")) {
					Router.replace("/login")
				}
				console.error(error);
			},
		}),
		fetchExchange
	],
})
