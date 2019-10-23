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

export function readCachedQuery<T>(query: DataProxy.Query<any>, attributeName: string): T {
  const result = client.readQuery<{ [key: string]: T}>(query);
  if (result === null) {
    throw new Error('Attempted to read cache, but found null value');
  }
  return result[attributeName];
}
export default client;
