import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function camelToUpperSnakeCase(str: string) {
  return str.replace(/[\w]([A-Z])/g, function(m) {
      return m[0] + "_" + m[1];
  }).toLocaleUpperCase();
}

function generateHooks(type: 'Query' | 'Mutation' | 'LazyQuery', nameArray: string[], source: string) {
  const imports: string[] = [];
  const documentNodes: string[] = [];
  nameArray = nameArray.map(name => name.replace(':', ''));
  const hooks = nameArray.reduce((acc, name) => {
    if (name === 'createUser') {
      return acc;
    }
    const capitalized = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    const possibleArgsName = `${type}${capitalized}Args`;
    const hasArgs = new RegExp(possibleArgsName).test(source);
    const argType = hasArgs ? `${type}${capitalized}Args`: 'null';
    if (argType !== 'null') {
      imports.push(argType);
    }
    const innerReturn = `${type.indexOf('Query') > -1 ? 'Query' : type}['${name}']`;
    const returnType = `{ ${name}: ${innerReturn} }`;
    const staticQuery = camelToUpperSnakeCase(name);
    documentNodes.push(staticQuery);
    return acc + '\n' +
      `export function use${type}${capitalized}(options${hasArgs ? '' : '?'}: ${type}HookOptions<${returnType}, ${argType}>)${type === 'LazyQuery' ? `: [LazyQuery<${argType}>, LazyQueryStatus<${innerReturn}>]` : ''} {\n` +
      (type === 'Query' ?
      `  const { loading, error, data } = use${type}<${returnType}, ${argType}>(${camelToUpperSnakeCase(name)}, options);\n` +
      `  return { loading, error, data: data ? data.${name} : data };\n`
      : type === 'Mutation' ?
      `  return use${type}<${returnType}, ${argType}>(${camelToUpperSnakeCase(name)}, options);\n`
      : type === 'LazyQuery' ?
      `  const [ queryFetch, { loading, error, data } ] = use${type}<${returnType}, ${argType}>(${camelToUpperSnakeCase(name)}, options);\n` +
      `  return [ queryFetch, { loading, error, data: data ? data.${name} : data } ];\n`
      : '') +
      `}\n`;
  }, '');
  return {
    imports,
    documentNodes,
    hooks,
  }
}

function generate() {
  const types = readFileSync(resolve(__dirname, '../__generated__/types.ts'), 'utf8');
  const queryMatch = types.match(/export type Query = (\{[\S\s]*?\});/);
  if (!queryMatch) {
    return;
  }
  const queryObject = queryMatch[1].replace(/__typename\?: 'Query',\n/, '');
  let queryNames = queryObject.match(/([a-zA-Z]+?):/g);
  if (!queryNames) {
    return;
  }
  queryNames = queryNames.map(name => name.replace(':', ''));
  const { hooks: queryHooks, imports: queryImports, documentNodes: queryNodes } = generateHooks('Query', queryNames, types);
  const { hooks: lazyQueryHooks } = generateHooks('LazyQuery', queryNames, types);
  const mutationMatch = types.match(/export type Mutation = (\{[\S\s]*?\});/);
  if (!mutationMatch) {
    return;
  }
  const mutationObject = mutationMatch[1].replace(/__typename\?: 'Mutation',\n/, '');
  let mutationNames = mutationObject.match(/([a-zA-Z]+?):/g);
  if (!mutationNames) {
    return;
  }
  const { hooks: mutationHooks, imports: mutationImports, documentNodes: mutationNodes } = generateHooks('Mutation', mutationNames, types);
  const hooks = '' +
  `import { useQuery, useMutation, useLazyQuery, QueryLazyOptions, QueryHookOptions, LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';\n` +
  `import { ApolloError } from 'apollo-boost';\n` +
  `import {\n` +
  `  Query,\n` +
  `  Mutation,\n` +
  `  ${[ ...queryImports, ...mutationImports ].join(',\n  ')}\n` +
  `} from '../../__generated__/types';\n` +
  `import {\n` +
  `  ${queryNodes.join(',\n  ')}\n` +
  `} from './queries';\n` +
  `import {\n` +
  `  ${mutationNodes.join(',\n  ')}\n` +
  `} from './mutations';\n` +
  `${queryHooks}\n` +
  `type LazyQuery<T> = (options?: QueryLazyOptions<T>) => void;\n` +
  `type LazyQueryStatus<T> = { loading: boolean, error: ApolloError | undefined, data: T | undefined };\n\n` +
  `${lazyQueryHooks}\n` +
  `${mutationHooks}`;
  writeFileSync(resolve(__dirname, '../src/apollo-client/hooks.ts'), hooks, 'utf8');
}
generate();
