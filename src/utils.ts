import { verify } from 'jsonwebtoken'

interface Token {
  userId: string
}

interface Context {
  request: any
}

export function getUserId(context: Context): string {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, process.env.APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}
