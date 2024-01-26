import { type httpPostParams, type IHttpPostClient } from '../../protocols/http/http.post.client.protocol'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string
  body?: object

  async post (params: httpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    await Promise.resolve()
  }
}
