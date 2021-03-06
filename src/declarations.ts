export interface AppPage {
  url: string;
  icon: object;
  title: string;
  component?: any;
}

export type ArrayUnpacked<T> = T extends (infer U)[] ? U : T;

export type FunctionReturn<T> = T extends (...args: any[]) => infer U ? U : T;
