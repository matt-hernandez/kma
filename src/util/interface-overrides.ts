export interface RouteParams {
  [key: string]: string;
}

export type AcceptAnyReturnVoid = (...args: any[]) => void;

export type AcceptAnyReturnAny = (...args: any[]) => any;

export type OptionalKeys<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;
