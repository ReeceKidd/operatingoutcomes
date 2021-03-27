import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  UseMiddleware,
  FieldResolver,
  Root,
} from 'type-graphql'
import { ObjectId } from 'mongodb'
import { MyContext } from '../types/MyContext'
import { ObjectIdScalar } from '../schema/object-id.scalar'
import { StreamInput } from '../types/StreamInput'
import { isAuth } from '../middlewares/isAuth'

import { Stream, StreamModel } from 'models/Stream'
import { User, UserModel } from 'models/User'

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  stream(@Arg('streamId', () => ObjectIdScalar) streamId: ObjectId) {
    return StreamModel.findById(streamId)
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    return StreamModel.find({ author: ctx.response.locals.userId })
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(
    @Arg('input') streamInput: StreamInput,
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    const { title, description, url } = streamInput
    const stream = new StreamModel({
      title,
      description,
      url,
      author: ctx.response.locals.userId,
    } as Stream)
    await stream.save()
    return stream
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async editStream(
    @Arg('input') streamInput: StreamInput,
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    const { id, title, description, url } = streamInput
    const stream = await StreamModel.findOneAndUpdate(
      {
        _id: id,
        author: ctx.response.locals.userId,
      },
      { title, description, url },
      { runValidators: true, new: true }
    )
    if (!stream) {
      throw new Error('Stream not found')
    }
    return stream
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStream(
    @Arg('streamId', () => ObjectIdScalar) streamId: ObjectId,
    @Ctx() ctx: MyContext
  ): Promise<Boolean | undefined> {
    const deleted = await StreamModel.findOneAndDelete({
      _id: streamId,
      author: ctx.response.locals.userId,
    })
    if (!deleted) {
      throw new Error('Stream not found')
    }
    return true
  }

  @FieldResolver()
  async author(@Root() stream: Stream): Promise<User | null> {
    return await UserModel.findById(stream.author)
  }
}
