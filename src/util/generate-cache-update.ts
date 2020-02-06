import { MutationUpdaterFn, FetchResult } from 'apollo-boost';
import { readCachedQuery } from '../apollo-client/client';

type OperationTypes = 'OVERWRITE_SINGLE_ITEM' | 'OVERWRITE_ITEM_IN_ARRAY' | 'TRANSFER_ITEM' | 'INSERT_ITEM' | 'REMOVE_ITEM';
interface OverwriteItemConfig {
  name: string;
  query: any;
  variables?: any;
}

interface InsertItemConfig<T> {
  name: string;
  query: any;
  variables?: any;
  sort?: (a: T, b: T) => number;
}

interface TransferItemConfig<T> {
  from: string;
  fromQuery: any;
  fromVariables?: any;
  to: string;
  toQuery: any;
  toVariables?: any;
  sort?: (a: T, b: T) => number;
}

export default function <T extends { cid: string, [key: string]: any }>(
  operation: OperationTypes,
  config: OverwriteItemConfig | TransferItemConfig<T> | InsertItemConfig<T>,
  resultName: string): (cache: Parameters<MutationUpdaterFn<{ [key: string]: T }>>[0], data: { data: T }) => void {
  const {
    name,
    query,
    variables = {},
    from,
    fromQuery,
    fromVariables = {},
    to,
    toQuery,
    toVariables = {},
    sort
  } = (config as any);
  return (cache, { data }) => {
    if (!data) {
      return;
    }
    const item: T = data;
    if (operation === 'OVERWRITE_SINGLE_ITEM') {
      cache.writeQuery({
        query: query,
        data: { [name]: item }
      });
    } else if (operation === 'OVERWRITE_ITEM_IN_ARRAY') {
      let items = readCachedQuery<T[]>({
        query,
        variables
      }, name);
      const index = items.findIndex(({ cid }) => item.cid === cid);
      items = [
        ...items.slice(0, index),
        item,
        ...items.slice(index + 1),
      ];
      cache.writeQuery({
        query: query,
        variables,
        data: { [name]: items }
      });
    } else if (operation === 'TRANSFER_ITEM') {
      const cachedFrom = readCachedQuery<T[]>({
        query: fromQuery,
        variables: fromVariables
      }, from);
      let cachedTo = readCachedQuery<T[]>({
        query: toQuery,
        variables: toVariables
      }, to);
      cache.writeQuery({
        query: fromQuery,
        variables: fromVariables,
        data: { [from]: cachedFrom.filter(({cid}) => cid !== item.cid) },
      });
      cachedTo = [ ...cachedTo, item ];
      if (sort) {
        cachedTo.sort(sort);
      }
      cache.writeQuery({
        query: toQuery,
        variables: toVariables,
        data: { [to]: cachedTo },
      });
    } else if (operation === 'INSERT_ITEM') {
      let items = readCachedQuery<T[]>({
        query,
        variables
      }, name);
      items = [ ...items, item ];
      if (sort) {
        items.sort(sort);
      }
      cache.writeQuery({
        query: query,
        variables,
        data: { [name]: items }
      });
    } else if (operation === 'REMOVE_ITEM') {
      let items = readCachedQuery<T[]>({
        query,
        variables
      }, name);
      items = items.filter(({ cid }) => cid !== item.cid);
      cache.writeQuery({
        query: query,
        variables,
        data: { [name]: items }
      });
    }
  };
}
