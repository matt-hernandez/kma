import { useQuery } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";

export default function useQueryHelperHelper<T>(query: DocumentNode, attributeName: string, config = {}) {
  const { loading, error, data = {} } = useQuery<{ [key: string]: T}>(query, config);
  return { loading, error, data: data[attributeName] };
}
