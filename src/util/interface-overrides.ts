export interface RouteParams {
  [key: string]: string;
}

export type AcceptAnyReturnVoid = (...args: any[]) => void;

export type AcceptAnyReturnAny = (...args: any[]) => any;

export type Optional<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;

type RemoveNever<T> = ({ [P in keyof T]: T[P] extends never ? never : P })[keyof T];

export type Intersecting<T, U> = Pick<T, RemoveNever<(Pick<T, Extract<keyof T, keyof U>> & Pick<U, Extract<keyof T, keyof U>>)>>;
