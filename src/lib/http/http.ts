import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create();

export const GET = async <T, D>(
  path: string,
  config?: AxiosRequestConfig<D>,
) => {
  return axiosInstance.get<T, AxiosResponse<T | null | undefined>, D>(
    path,
    config,
  );
};

export const POST = async <T, D>(
  path: string,
  payload?: D,
  config?: AxiosRequestConfig<D>,
) => {
  return axiosInstance.post<T, AxiosResponse<T | null | undefined>, D>(
    path,
    payload,
    config,
  );
};

export const PUT = async <T, D>(
  path: string,
  payload?: D,
  config?: AxiosRequestConfig<D>,
) => {
  return axiosInstance.put<T, AxiosResponse<T | null | undefined>, D>(
    path,
    payload,
    config,
  );
};

export const DELETE = async <T, D>(
  path: string,
  config?: AxiosRequestConfig<D>,
) => {
  return axiosInstance.delete<T, AxiosResponse<T | null | undefined>, D>(
    path,
    config,
  );
};
