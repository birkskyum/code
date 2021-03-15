import { buildSchemaSync } from 'type-graphql'
import { resolvers } from '@schema'

import { ActerResolver } from 'api/resolvers/acter'

import { authChecker } from 'api/auth-checker'

export const schema = buildSchemaSync({
  authChecker,
  resolvers: [...resolvers, ActerResolver],
  validate: false,
})