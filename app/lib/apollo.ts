import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = createApolloClient()
  // initial apollo client state gets rehydrated here.
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
