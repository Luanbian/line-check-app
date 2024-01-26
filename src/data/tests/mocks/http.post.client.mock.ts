import { HttpStatusCode, type HttpResponse } from '../../../@types/http.response'
import { type httpPostParams, type IHttpPostClient } from '../../protocols/http/http.post.client.protocol'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.unathorized,
    body: null
  }

  async post (params: httpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
