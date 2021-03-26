import { InputType, Field } from 'type-graphql'

import { ObjectId } from 'mongodb'

import { Stream } from '../models/Stream'

// Partial makes all the properties in any type optional. So not everything is required.

@InputType()
export class StreamInput implements Partial<Stream> {
  @Field({ nullable: true })
  id?: ObjectId

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  url: string
}
