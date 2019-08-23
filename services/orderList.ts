/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosResponse } from 'axios'
import request, { RequestConfig } from '-/utils/request'

interface GetListParams {
  page: number;
  limit: number;
}

interface GetListReturnData {
  list: number[];
  total: number;
}

export function requestGetList(params: GetListParams, requestConfig?: RequestConfig) {
  return request.get<GetListReturnData>('/api/get-list', requestConfig)
}

export function requestGetListWithResponse(params: GetListParams, requestConfig?: RequestConfig) {
  const finalParams = { ...requestConfig, getResponse: true }

  return request.get<GetListReturnData>('/api/get-list', finalParams)
}

export function requestGetList500(requestConfig?: RequestConfig): Promise<AxiosResponse> {
  return request('/api/get-list-500', requestConfig)
}

export default undefined
