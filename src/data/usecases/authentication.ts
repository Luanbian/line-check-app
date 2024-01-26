import { type IHttpPostClient } from '../protocols/http/http.post.client.protocol'

export class Authentication {
  constructor (
    private readonly url: string,
    private readonly HttpPostClient: IHttpPostClient
  ) {}

  async auth (): Promise<void> {
    await this.HttpPostClient.post(this.url)
  }
}
