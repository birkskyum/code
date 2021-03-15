import { AuthChecker } from 'type-graphql'

import { JWTToken } from 'src/lib/next-auth/jwt'

interface Context {
  token: JWTToken
}

export const authChecker: AuthChecker<Context> = ({ context: { token } }) => {
  return Boolean(token?.email)
}