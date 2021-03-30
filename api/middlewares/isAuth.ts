import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types/MyContext'
import jwt from 'jsonwebtoken'

export const APP_SECRET = '1234'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.request.headers['authorization'] as String
  try {
    const token = authorization?.replace('Bearer ', '')

    const user = jwt.verify(token!, APP_SECRET) as any
    context.response.locals.userId = user.id
    return next()
  } catch (err) {
    throw new Error(err.message)
  }
}
