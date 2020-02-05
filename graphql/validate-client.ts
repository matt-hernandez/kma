import { validate } from 'graphql/validation';
import { buildSchema, GraphQLError } from 'graphql';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { red, bold } from 'colors/safe';
import * as queries from '../src/apollo-client/queries';
import * as mutations from '../src/apollo-client/mutations';

const schema = readFileSync(resolve(__dirname, 'schema.graphql'), 'utf8');
const graphQLSchema = buildSchema(schema);
const queryErrors = Object.keys(queries).reduce((acc, name) => {
  const ast = (queries as any)[name];
  const errors = validate(graphQLSchema, ast);
  return [ ...acc, ...errors ];
}, [] as GraphQLError[]);
const mutationErrors = Object.keys(mutations).reduce((acc, name) => {
  const ast = (mutations as any)[name];
  const errors = validate(graphQLSchema, ast);
  return [ ...acc, ...errors ];
}, [] as GraphQLError[]);
if (queryErrors.length || mutationErrors.length) {
  [ ...queryErrors, ...mutationErrors ].forEach((error, index) => {
    console.error(`${index + 1}: ${bold(red(error.message))}`);
  });
  throw new Error('Validation failed!');
}
