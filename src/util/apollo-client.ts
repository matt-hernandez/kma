import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
  uri: 'http://localhost:4000',
  credentials: 'include',
  cache: new InMemoryCache({
    dataIdFromObject: (object: any) => object.cid || null
  })
});
