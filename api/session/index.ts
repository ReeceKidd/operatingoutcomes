import { connect } from 'mongoose'
import dotenv from 'dotenv'

export default async function createSession() {
  dotenv.config()
  const MONGO_URL = process.env.MONGO_URL || ''
  if (!MONGO_URL) {
    throw new Error('Missing MONGO_URL')
  }
  return connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
}
