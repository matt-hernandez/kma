import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { readCachedQuery } from '../apollo-client/client';

type ContextProps = {
  addPendingQuery: (query: string) => void,
  removePendingQuery: (query: string) => void,
  addQueryError: (query: string, error: any) => void,
  removeQueryError: (query: string) => void,
  addPollingError: (query: string, error: any) => void,
  removePollingError: (query: string) => void,
  queryIsLoading: (query: string) => boolean,
  queryHasLoadingError: (query: string) => boolean,
  queryHasPollingError: (query: string) => boolean
};

export const QueryTrackerContext = createContext<ContextProps>({
  addPendingQuery: () => {},
  removePendingQuery: () => {},
  addQueryError: () => {},
  removeQueryError: () => {},
  addPollingError: () => {},
  removePollingError: () => {},
  queryIsLoading: () => false,
  queryHasLoadingError: () => false,
  queryHasPollingError: () => false
});

const Provider = QueryTrackerContext.Provider;

export const QueryTrackerProvider: React.FunctionComponent = ({children}) => {
  const pendingQueries = useRef<Array<String>>([]);
  const queryErrors = useRef(new Map());
  const pollingErrors = useRef(new Map());
  function addPendingQuery(query: string) {
    if (pendingQueries.current.includes(query)) {
      return;
    }
    pendingQueries.current = [...pendingQueries.current, query];
  }
  function removePendingQuery(query: string) {
    pendingQueries.current = [
      ...pendingQueries.current.slice(0, pendingQueries.current.indexOf(query)),
      ...pendingQueries.current.slice(pendingQueries.current.indexOf(query) + 1)
    ];
  }
  function addQueryError(query: string, error: any) {
    queryErrors.current.set(query, error);
    queryErrors.current = new Map(queryErrors.current);
  }
  function addPollingError(query: string, error: any) {
    pollingErrors.current.set(query, error);
    pollingErrors.current = new Map(queryErrors.current);
  }
  function queryIsLoading(query: string) {
    return pendingQueries.current.includes(query);
  }
  function queryHasLoadingError(query: string) {
    return queryErrors.current.has(query);
  }
  function queryHasPollingError(query: string) {
    return pollingErrors.current.has(query);
  }
  function removeQueryError(query: string) {
    queryErrors.current.delete(query);
    queryErrors.current = new Map(queryErrors.current);
  }
  function removePollingError(query: string) {
    pollingErrors.current.delete(query);
    pollingErrors.current = new Map(queryErrors.current);
  }
  return (
    <Provider value={{
      addPendingQuery,
      removePendingQuery,
      addQueryError,
      addPollingError,
      queryIsLoading,
      queryHasLoadingError,
      queryHasPollingError,
      removeQueryError,
      removePollingError
    }}>
      {children}
    </Provider>
  );
};

export const useQueryHelper = (query: any, config: any = {}) => {
  const queryData = useQuery(query, {
    ...config,
    notifyOnNetworkStatusChange: true
  });
  const { addPendingQuery, removePendingQuery, addQueryError, removeQueryError, addPollingError, removePollingError } = useContext(QueryTrackerContext);
  const previousNetworkStatusRef = useRef(queryData.networkStatus);
  useEffect(() => void (previousNetworkStatusRef.current = queryData.networkStatus), [queryData.networkStatus]);
  if (queryData.networkStatus === 1) {
    addPendingQuery(query);
  }
  if (config.pollInterval && previousNetworkStatusRef.current === 6 && !queryData.loading) {
    if (queryData.error) {
      addPollingError(query, queryData.error);
    } else if (queryData.data) {
      removePollingError(query);
    }
  }
  if (!queryData.loading && previousNetworkStatusRef.current === 1) {
    if (queryData.error) {
      addQueryError(query, queryData.error);
    } else if (queryData.data) {
      removePendingQuery(query);
      removeQueryError(query);
    }
  }
  return queryData;
};

type PullFromCache = {
  query: any;
  variables?: any;
  propName: string;
};

interface CacheStatus<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useCache = function<T>({
    query,
    variables = {},
    propName
  } : PullFromCache): CacheStatus<T> {
    const { queryIsLoading } = useContext(QueryTrackerContext);
    if (queryIsLoading(query)) {
      return { data: null, loading: true, error: null };
    }
    try {
      const value = readCachedQuery({
        query,
        variables
      }, propName);
      return { data: value, loading: false, error: null };
    } catch(e) {
      return { data: null, loading: false, error: e };
    }
};
