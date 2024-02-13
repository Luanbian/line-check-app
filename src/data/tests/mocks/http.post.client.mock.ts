import { HttpStatusCode, type HttpResponse } from '../../../@types/http.response'
import { type httpParams, type IHttpClient } from '../../protocols/http/http.post.client.protocol'

export class HttpPostClientMock implements IHttpClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async request (params: httpParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
