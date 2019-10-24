export interface RouteParams {
  [key: string]: string;
}

export type AcceptAnyReturnVoid = (...args: any[]) => void;
