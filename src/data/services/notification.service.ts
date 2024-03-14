import { type EntityNames } from '../../domain/entities/entity.names'
import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'
import { type IinsertDeviceToken } from '../protocols/insert.device.token.protocol'
import { type INotificationService, type message } from '../protocols/notification.service.protocol'

export class NotificationService implements INotificationService {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpClient,
    private readonly insertDeviceToken: IinsertDeviceToken
  ) {}

  public async send (accountId: string, data: EntityNames[], token: string): Promise<void> {
    const deviceToken = await this.verifyDeviceToken(accountId, data, token)
    const message = this.mountMessage(deviceToken)
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

  private async verifyDeviceToken (accountId: string, data: EntityNames[], token: string): Promise<string> {
    const account = data.filter(item => item.id === accountId)[0]
    const deviceToken = await this.insertDeviceToken.getToken()
    if (account.deviceToken === null || deviceToken !== account.deviceToken) {
      await this.insertDeviceToken.perform({ accountId }, token)
    }
    return deviceToken
  }

  private mountMessage (deviceToken: string): message {
    const message: message = {
      to: deviceToken,
      title: 'titulo de teste',
      body: 'tamo aqui testando'
    }
    return message
  }
}
