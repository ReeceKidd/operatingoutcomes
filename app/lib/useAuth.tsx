import { useState, useContext, createContext } from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

import { useSignInMutation } from 'lib/graphql/signin.graphql'
import { useSignUpMutation } from 'lib/graphql/signup.graphql'
import { useCurrentUserQuery, User } from 'lib/graphql/currentUser.graphql'

type AuthProps = {
  user: User
  error: string
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<Partial<AuthProps>>({})

export function AuthProvider({ children }) {
  const auth = useProviderAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

function useProviderAuth() {
  const client = useApolloClient()
  const router = useRouter()
  const [error, setError] = useState('')
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
  })
  const user = data && data.currentUser
  const [signInMutation] = useSignInMutation()
  const [signUpMutation] = useSignUpMutation()
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await signInMutation({ variables: { email, password } })
      if (data.login.token && data.login.user) {
        sessionStorage.setItem('token', data.login.token)
        client.resetStore().then(() => {
          router.push('/')
        })
      } else {
        setError('Invalid login')
      }
    } catch (err) {
      setError(err.message)
    }
  }
  const signUp = async (email: string, password: string) => {
    try {
      const { data } = await signUpMutation({ variables: { email, password } })
      if (data.register.token && data.register.user) {
        sessionStorage.setItem('token', data.register.token)
        client.resetStore().then(() => {
          router.push('/')
        })
      } else {
        setError('Invalid login')
      }
    } catch (err) {
      setError(err.message)
    }
  }
  const signOut = () => {
    sessionStorage.removeItem('token')
    client.resetStore().then(() => {
      router.push('/')
    })
  }

  return {
    user,
    error,
    signIn,
    signOut,
    signUp,
  }
}
