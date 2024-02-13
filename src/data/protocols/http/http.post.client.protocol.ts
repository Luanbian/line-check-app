import { type HttpResponse } from '../../../@types/http.response'

export interface httpParams {
  url: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  body?: object
}

export interface IHttpClient {
  request: (params: httpParams) => Promise<HttpResponse>
}
