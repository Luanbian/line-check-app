import { type IHttpPostClient } from '../../protocols/http/http.post.client.protocol'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string

  async post (url: string): Promise<void> {
    this.url = url
    await Promise.resolve()
  }
}
