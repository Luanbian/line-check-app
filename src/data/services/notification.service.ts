import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'

interface message {
  to: string
  title: string
  body: string
}

export class NotificationService {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpClient
  ) {}

  public async send (): Promise<void> {
    const message = await this.mountMessage()
    await this.httpPostClient.request({
      method: 'POST',
      url: this.url,
      body: message,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  private async mountMessage (): Promise<message> {
    const message: message = {
      to: 'expo token',
      title: 'titulo de teste',
      body: 'tamo aqui testando'
    }
    return message
  }
}
