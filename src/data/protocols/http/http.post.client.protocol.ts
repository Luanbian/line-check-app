import { type HttpResponse } from '../../../@types/http.response'

export interface httpPostParams {
  url: string
  body?: object
}

export interface IHttpPostClient {
  post: (params: httpPostParams) => Promise<HttpResponse>
}
