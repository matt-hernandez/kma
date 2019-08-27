import { useState, useCallback } from 'react';

function range([min, max]: [number, number]) {
  const array = [];
  for (let i = min; i < max; i++) {
    array.push(i);
  }
  return array;
}

export const listenerTypes = Object.freeze({
  TOGGLE(getter: () => boolean, setter: (value: boolean) => void) {
    return () => {
      setter(!getter());
    };
  },
  TOGGLE_ONCE(getter: () => boolean, setter: (value: boolean) => void) {
    let toggle = listenerTypes.TOGGLE(getter, setter);
    let hasRun = false;
    return useCallback(() => {
      if (hasRun) {
        return;
      }
      hasRun = true; // eslint-disable-line
      toggle();
    }, []);
  },
  TOGGLE_VALUES(getter: () => any, setter: (value: any) => void, values: [any, any]) {
    const [ a, b ] = values;
    return () => {
      setter(getter() === a ? b : a);
    };
  },
  VALUES(setter: (value: any) => void, values: Array<any>) {
    return values.map((value) => {
      return () => setter(value);
    });
  },
  RANGE(setter: (value: number) => void, minAndMax: [number, number]) {
    const numbers = range(minAndMax);
    return numbers.map((value) => {
      return () => setter(value);
    })
  },
  RESOLVER(setter: (value: any) => void, resolver: (...args: any[]) => any) {
    return () => {
      setter(resolver());
    };
  }
});

export const useStateHelper = (
    initialValue: any,
    listenerGenerator: Function,
    valuesOrResolver: Array<any> | Function
  ): [ any, ...Array<(...args: Array<any>) => void> ] => {
  const [ value, setter ] = useState(initialValue);
  const getter = () => value;
  if (listenerGenerator === listenerTypes.TOGGLE || listenerGenerator === listenerTypes.TOGGLE_ONCE) {
    const listener = listenerGenerator(getter, setter);
    return [ value, listener ];
  }
  if (listenerGenerator === listenerTypes.TOGGLE_VALUES) {
    const listener = listenerGenerator(getter, setter, valuesOrResolver);
    return [ value, listener ];
  }
  if (listenerGenerator === listenerTypes.VALUES) {
    const listeners = listenerGenerator(setter, valuesOrResolver);
    return [ value, ...listeners ];
  }
  if (listenerGenerator === listenerTypes.RANGE) {
    const listeners = listenerGenerator(setter, valuesOrResolver);
    return [ value, ...listeners ];
  }
  if (listenerGenerator === listenerTypes.RESOLVER) {
    const listener = listenerGenerator(setter, valuesOrResolver);
    return [ value, listener ];
  }
  return [ value, setter ];
};
