import 'reflect-metadata'

import { GraphQLSchema } from 'graphql/type'
import path from 'path'
import { buildSchema } from 'type-graphql'

import { getLogger } from '@acter/lib/logger/logger'

import { authChecker } from './auth-checker'
import {
  resolvers,
  applyResolversEnhanceMap,
  resolversEnhanceMap,
} from './resolvers'

let schema
const l = getLogger('generateSchema')

export const generateSchema = async (
  writeSchema = false
): Promise<GraphQLSchema> => {
  const timer = l.startTimer()

  applyResolversEnhanceMap(resolversEnhanceMap)

  if (!schema) {
    const generatedPath = path.join(__dirname, 'generated')
    const graphQLSchemaFilename = path.join(generatedPath, 'schema.graphql')
    schema = await buildSchema({
      authChecker,
      resolvers,
      validate: false,
      dateScalarMode: 'isoDate',
      // emitSchemaFile: schemaExists ? false : graphQLSchemaFilename,
      emitSchemaFile: writeSchema ? graphQLSchemaFilename : false,
    })
    timer.done('built schema')
  } else {
    timer.done('using existing schema')
  }

  return schema
}
