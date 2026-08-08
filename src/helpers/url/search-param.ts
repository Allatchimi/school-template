import { ReadonlyURLSearchParams } from "next/navigation";

// get
export const getSearchParam = (url: string, param: string) => {
  const newUrl = new URL(url);
  return newUrl.searchParams.get(param);
};
export function getSearchParamFromObjectType<T extends object | undefined>(
  searchParams: ReadonlyURLSearchParams,
  template?: T,
): T {
  const result: Partial<T> = {};

  for (const key of Object.keys(template ?? {})) {
    const value = searchParams.get(key);
    if (value !== null) {
      // @ts-expect-error : TS cannot detect dynamically the type
      result[key] = isNaN(+value) ? value : +value;
    }
  }

  return result as T;
}

// Set
export const setMultipleSearchParam = (
  url: string,
  params: {
    param: string;
    value: string;
  }[],
) => {
  const newUrl = new URL(url);
  for (let i = 0; i < params.length; i++) {
    if (params[i].value.length < 1) {
      newUrl.searchParams.delete(params[i].param);
    } else {
      newUrl.searchParams.set(params[i].param, params[i].value);
    }
  }
  return newUrl;
};
export const setMultipleSearchParamFromObject = (
  url: string,
  params?: object,
) => {
  const newUrl = new URL(url);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    const valueStr: string = value?.toString() ?? "";
    if (valueStr.length < 1) {
      newUrl.searchParams.delete(key);
    } else {
      newUrl.searchParams.set(key, valueStr);
    }
  });
  return newUrl;
};

// Delete
export const deleteMultipleSearchParam = (url: string, params: string[]) => {
  const newUrl = new URL(url);
  for (let i = 0; i < params.length; i++) {
    newUrl.searchParams.delete(params[i]);
  }
  return newUrl;
};
