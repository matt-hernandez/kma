import { ApolloError } from "apollo-client";
import { useLazyQuery, QueryLazyOptions } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";

type LazyQuery = (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;

export default function useLazyQueryHelper<T>(query: DocumentNode, attributeName: string, config = {}):
  [LazyQuery, { loading: boolean, error: ApolloError | undefined, data: T }] {
  const [ queryFetch, { loading, error, data = {} } ] = useLazyQuery<{ [key: string]: T}>(query, config);
  return [ queryFetch, { loading, error, data: data[attributeName] } ];
}
