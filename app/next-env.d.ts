/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.graphqls' {
  import { Document } from 'graphql'
  export default typeof DocumentNode
}

declare module '*.yml'
