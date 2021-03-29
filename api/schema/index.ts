import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import path from 'path'

import { UserResolver } from '../resolvers/UserResolver'
import { AuthResolver } from '../resolvers/AuthResolver'
import { StreamResolver } from '../resolvers/StreamResolver'
import { ObjectIdScalar } from './object-id.scalar'
import { TypegooseMiddleware } from '../middlewares/typegoose'

// Build a typegraph executable schema.
export default async function createSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    // 1. add all typescript resolvers.
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  })
}
