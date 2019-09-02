interface PageData {
  slug: string;
  title: string;
}

export function addPageData<T>(component: T, pageData: PageData): T & { pageData: PageData } {
  (component as T & { pageData: PageData }).pageData = pageData;
  return component as T & { pageData: PageData };
}