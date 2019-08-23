/* eslint-disable @typescript-eslint/no-explicit-any,import/export */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Toast } from 'antd-mobile'

const axiosInstance = axios.create({
  baseURL: 'http://10.0.4.32:4000',
  timeout: 5000,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data
    if (response.data.errcode !== 0) {
      Toast.fail(response.data.errmsg)
    }

    return response
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

export interface RequestConfig extends AxiosRequestConfig {
  errorHandler?: (error: AxiosError) => any;
  getResponse?: boolean;
}

export interface RequestResponse<T = any> {
  data: T;
  response: AxiosResponse<T>;
}

export interface RequestConfigWithResponse extends RequestConfig {
  getResponse: true;
}

export interface RequestConfigWithoutResponse extends RequestConfig {
  getResponse: false;
}

function request<R = any>(url: string): Promise<R>
function request<R = any>(url: string, options: RequestConfigWithoutResponse): Promise<R>
function request<R = any>(
  url: string,
  options: RequestConfigWithResponse
): Promise<RequestResponse<R>>
function request<R = any>(url: string, options?: RequestConfig): Promise<R>
function request<R = any>(urlOrConfig: any, config?: any): any {
  let finalConfig: Partial<RequestConfigWithResponse | RequestConfigWithoutResponse> = {
    getResponse: false,
  }

  if (typeof urlOrConfig === 'string') {
    finalConfig = { ...finalConfig, url: urlOrConfig, ...config }
  } else {
    finalConfig = { ...finalConfig, ...urlOrConfig }
  }

  const { getResponse, errorHandler, ...restConfig } = finalConfig

  return new Promise((resolve, reject): void => {
    axiosInstance
      .request<R>(restConfig)
      .then(response => {
        if (getResponse) {
          resolve({ data: response.data, response })
        } else {
          resolve(response.data)
        }
      })
      .catch(err => {
        if (err.isAxiosError && errorHandler) {
          try {
            const data = errorHandler(err)

            resolve(data)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(err)
        }
      })
  })
}

// eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare
namespace request {
  export function get<R = any>(url: string): Promise<R>
  export function get<R = any>(url: string, options: RequestConfigWithoutResponse): Promise<R>
  export function get<R = any>(
    url: string,
    options: RequestConfigWithResponse
  ): Promise<RequestResponse<R>>
  export function get<R = any>(url: string, options?: RequestConfig): Promise<R>
  // eslint-disable-next-line no-inner-declarations
  export function get<R = any>(urlOrConfig: any, config?: any): any {
    return request<R>(urlOrConfig, { ...config, method: 'get' })
  }

  export function post<R = any>(url: string): Promise<R>
  export function post<R = any>(url: string, options: RequestConfigWithoutResponse): Promise<R>
  export function post<R = any>(
    url: string,
    options: RequestConfigWithResponse
  ): Promise<RequestResponse<R>>
  export function post<R = any>(url: string, options?: RequestConfig): Promise<R>
  // eslint-disable-next-line no-inner-declarations
  export function post<R = any>(urlOrConfig: any, config?: any): any {
    return request<R>(urlOrConfig, { ...config, method: 'get' })
  }

  export function Delete<R = any>(url: string): Promise<R>
  export function Delete<R = any>(url: string, options: RequestConfigWithoutResponse): Promise<R>
  export function Delete<R = any>(
    url: string,
    options: RequestConfigWithResponse
  ): Promise<RequestResponse<R>>
  export function Delete<R = any>(url: string, options?: RequestConfig): Promise<R>
  // eslint-disable-next-line no-inner-declarations
  export function Delete<R = any>(urlOrConfig: any, config?: any): any {
    return request<R>(urlOrConfig, { ...config, method: 'get' })
  }

  export function put<R = any>(url: string): Promise<R>
  export function put<R = any>(url: string, options: RequestConfigWithoutResponse): Promise<R>
  export function put<R = any>(
    url: string,
    options: RequestConfigWithResponse
  ): Promise<RequestResponse<R>>
  export function put<R = any>(url: string, options?: RequestConfig): Promise<R>
  // eslint-disable-next-line no-inner-declarations
  export function put<R = any>(urlOrConfig: any, config?: any): any {
    return request<R>(urlOrConfig, { ...config, method: 'get' })
  }

  export function head<R = any>(url: string): Promise<R>
  export function head<R = any>(url: string, options: RequestConfigWithoutResponse): Promise<R>
  export function head<R = any>(
    url: string,
    options: RequestConfigWithResponse
  ): Promise<RequestResponse<R>>
  export function head<R = any>(url: string, options?: RequestConfig): Promise<R>
  // eslint-disable-next-line no-inner-declarations
  export function head<R = any>(urlOrConfig: any, config?: any): any {
    return request<R>(urlOrConfig, { ...config, method: 'get' })
  }

  export function patch<R = any>(url: string): Promise<R>
  export function patch<R = any>(url: string, options: RequestConfigWithoutResponse): Promise<R>
  export function patch<R = any>(
    url: string,
    options: RequestConfigWithResponse
  ): Promise<RequestResponse<R>>
  export function patch<R = any>(url: string, options?: RequestConfig): Promise<R>
  // eslint-disable-next-line no-inner-declarations
  export function patch<R = any>(urlOrConfig: any, config?: any): any {
    return request<R>(urlOrConfig, { ...config, method: 'get' })
  }
}

export default request
