import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Ctx,
  Arg,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { ObjectId } from 'mongodb'
import { MyContext } from '../types/MyContext'
import { User, UserModel } from '../models/User'
import { ObjectIdScalar } from '../schema/object-id.scalar'
import { StreamInput } from '../types/StreamInput'
import { isAuth } from '../middlewares/isAuth'
import { Stream } from 'node:stream'
import { StreamModel } from 'models/Stream'

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  stream(@Arg('streamId', () => ObjectIdScalar) streamId: ObjectId) {
    return StreamModel.findById(streamId)
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    // Display all streams for the current user.
    return StreamModel.find({ author: ctx.response.locals.userId })
  }

  //   @Mutation(() => Stream)
  //   @UseMiddleware(isAuth)
  //   async addStream(@Arg('input'), streamInput: StreamInput, @Ctx() ctx: MyContext): Promise<Stream>{
  //       // creating a new users stream
  //       const stream = new StreamModel({
  //         title: 0,
  //       })

  //   }
}
