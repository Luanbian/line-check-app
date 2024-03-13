import { HttpStatusCode, type HttpResponse } from '../../../@types/http.response'
import { type httpParams, type IHttpClient } from '../../../infra/protocols/http.post.client.protocol'

export class HttpClientMock implements IHttpClient {
  url?: string
  body?: object
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  headers?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async request (params: httpParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    this.method = params.method
    this.headers = params.headers
    return await Promise.resolve(this.response)
  }
}
