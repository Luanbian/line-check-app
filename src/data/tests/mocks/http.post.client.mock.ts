import { type httpPostParams, type IHttpPostClient } from '../../protocols/http/http.post.client.protocol'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string

  async post (params: httpPostParams): Promise<void> {
    this.url = params.url
    await Promise.resolve()
  }
}
