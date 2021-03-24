import { prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { Ref } from '../types/Ref'

@ObjectType({ description: 'Stream embedded post content' })
export class Stream {
  @Field()
  readonly _id: ObjectId

  @Field()
  @prop({ required: true })
  title: string

  @Field()
  @prop({ required: true })
  description: string

  @Field()
  @prop({ required: true })
  url: string

  @Field(() => User)
  @prop({ ref: User, required: true })
  author: Ref<User>
}

export const StreamModel = getModelForClass(Stream)
