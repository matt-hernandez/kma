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
      `export function use${type}${capitalized}(options${hasArgs ? '' : '?'}: ${type !== 'Mutation' ? `${type}HookOptions`: `MutationHookOptionsWrap`}<${returnType},${type !== 'Mutation' ? '' : ` ${innerReturn},`} ${argType}>)${type === 'LazyQuery' ? `: [LazyQuery<${argType}>, LazyQueryStatus<${innerReturn}>]` : ''} {\n` +
      (type === 'Query' ?
      `  const { loading, error, data, ...query } = use${type}<${returnType}, ${argType}>(${camelToUpperSnakeCase(name)}, options);\n` +
      `  return { loading, error, data: data ? data.${name} : data, __operationName: '${name}', ...query };\n`
      : type === 'Mutation' ?
      `  const updater: MutationUpdaterFn<${returnType}> = generateSimpleUpdate('${name}', options.update);\n` +
      `  const [ mutationFn ] = use${type}<${returnType}, ${argType}>(${camelToUpperSnakeCase(name)}, { ...options, update: updater });\n` +
      `  type Options = Parameters<typeof mutationFn>[0];\n` +
      `  return (options: Options) => mutationFn(options).then(({ data }) => {\n` +
      `    if (data === undefined) {\n` +
      `      throw new Error('Value of \`data\` from successful mutation cannot be undefined!');\n` +
      `    }\n` +
      `    return { data: data.${name} };\n` +
      `  });\n`
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
  let queryNames = queryObject.match(/([a-zA-Z]+?)\??:/g);
  if (!queryNames) {
    return;
  }
  queryNames = queryNames.map(name => name.replace(/\??:/, ''));
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
  `import { ApolloError, MutationUpdaterFn } from 'apollo-boost';\n` +
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
  `type LazyQueryStatus<T> = { loading: boolean, error: ApolloError | undefined, data: T | undefined };\n` +
  `${lazyQueryHooks}\n` +
  `type MutationUpdaterFnParams<R> = Parameters<MutationUpdaterFn<R>>;\n` +
  `type SimpleUpdate<R, T> = (cache: MutationUpdaterFnParams<R>[0], result: { data: T }, context?: MutationUpdaterFnParams<R>[1]['context']) => void;\n` +
  `type MutationHookOptionsWrap<R, T, A> = Omit<MutationHookOptions<R, A>, 'update'> & { update: SimpleUpdate<R, T> };\n\n` +
  `function generateSimpleUpdate<R extends { [key: string]: T }, T>(name: string, update: SimpleUpdate<R, T>): MutationUpdaterFn<R> {\n` +
  `  return (cache, { data, context }) => {\n` +
  `    if (data === undefined || data === null) {\n` +
  `      throw new Error('Mutation result cannot be \`undefined\` or \`null\`');\n` +
  `    }\n` +
  `    update(cache, { data: data[name] }, context);\n` +
  `  };\n` +
  `}\n` +
  `${mutationHooks}`;
  writeFileSync(resolve(__dirname, '../src/apollo-client/hooks.ts'), hooks, 'utf8');
}
generate();
