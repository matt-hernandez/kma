import { AcceptAnyReturnVoid } from './interface-overrides';
import { useStateHelper, listenerTypes } from './use-state-helper';
import { useState, useRef } from 'react';

interface NetworkPayload {
  data: any;
  onSuccess: AcceptAnyReturnVoid;
  onNetworkError: () => void;
  onAppError: AcceptAnyReturnVoid;
}

interface XHRPayload extends NetworkPayload {
  url: string;
}

interface LoginError {
  appError?: null | { code: number, message: string };
  networkError?: Error | null;
}

type LoginReturnType = [
  (username: string, password: string) => Promise<any>,
  {
    loading: boolean;
    error: null | LoginError;
    data: any;
  }
]

const makeXHR = ({
    url,
    data,
    onSuccess,
    onNetworkError,
    onAppError,
  }: XHRPayload) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else if (xhr.status >= 400) {
        onAppError(xhr.status, xhr.response);
      }
    }
  };
  xhr.onerror = onNetworkError;
  xhr.send(JSON.stringify(data));
};

export const useLogin = (): LoginReturnType => {
  const loadingRef = useRef(false);
  const [ , triggerChange ] = useStateHelper(false, listenerTypes.TOGGLE);
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState<LoginReturnType[1]['error']>(null);
  const query = (username: string, password: string) => new Promise((resolve, reject) => {
    if (!loadingRef.current) {
      loadingRef.current = true;
      makeXHR({
        url: '',
        data: { username, password },
        onSuccess: (data) => {
          setData(data);
          resolve(data);
        },
        onNetworkError: () => {
          const e = {
            networkError: new Error('Could not connect to the server'),
            appError: null
          };
          setError(e);
          reject(e);
        },
        onAppError: (code: number, message: string) => {
          const e = {
            networkError: null,
            appError: { code, message }
          };
          setError(e);
          reject(e);
        }
      });
      triggerChange();
    }
  });
  return [ query, { loading: loadingRef.current, error, data } ];
};

export const useFakeLogin: (...args: any[]) => LoginReturnType = () => {
  const loadingRef = useRef(false);
  const [ , triggerChange ] = useStateHelper(false, listenerTypes.TOGGLE);
  const [ data, setData ] = useState<any>(null);
  const [ error, setError ] = useState<LoginReturnType[1]['error']>(null);
  const query = (username: string, password: string) => new Promise((resolve, reject) => {
    if (!loadingRef.current) {
      loadingRef.current = true;
      setTimeout(() => {
        loadingRef.current = false;
        if (username === 'matt.isaiah.hernandez@gmail.com') {
          setData(true);
          resolve(true);
        } else {
          const e = {
            networkError: null,
            appError: { code: 401, message: 'No credentials found' }
          };
          setError(e);
          reject(e);
        }
      }, 2500);
      triggerChange();
    }
  });
  return [ query, { loading: loadingRef.current, error, data } ];
}
