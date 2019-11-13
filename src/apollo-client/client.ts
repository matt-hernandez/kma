import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DataProxy } from 'apollo-cache';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  credentials: 'include',
  cache: new InMemoryCache({
    dataIdFromObject: (object: any) => object.cid || null
  })
});

export function readCachedQuery<T = any>(query: DataProxy.Query<any>, attributeName: string, variables: any = {}): T {
  const result = client.readQuery<{ [key: string]: T}>(query);
  if (result === null) {
    throw new Error('Attempted to read cache, but found null value');
  }
  return result[attributeName];
}

export function readCachedQueryWithDefault<T = any>(query: DataProxy.Query<any>, attributeName: string, defaultResponse: T): T {
  try {
    return readCachedQuery(query, attributeName);
  } catch (e) {
    return defaultResponse;
  }
}

export function writeCachedQuery<T = any>(query: any, attributeName: string, value: any, variables: any = {}): void {
  client.writeQuery<{ [key: string]: T}>({
    query,
    variables,
    data: { [attributeName]: value }
  });
}

export default client;
