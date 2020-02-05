import { ApolloError } from "apollo-client";
import { useLazyQuery, QueryLazyOptions } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";

type LazyQuery = (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
type LazyQueryStatus<T> = { loading: boolean, error: ApolloError | undefined, data: T };

export default function useLazyQueryHelper<T>(query: DocumentNode, attributeName: string, config = {}):
  [LazyQuery, LazyQueryStatus<T>] {
  const [ queryFetch, { loading, error, data = {} } ] = useLazyQuery<{ [key: string]: T}>(query, config);
  return [ queryFetch, { loading, error, data: data[attributeName] } ];
}
