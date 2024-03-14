import { HttpStatusCode } from '../../@types/http.response'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'
import { type INotification } from '../../infra/protocols/notification.protocol'
import { type InsertDeviceTokenParams, type IinsertDeviceToken } from '../protocols/insert.device.token.protocol'

export class InsertDeviceToken implements IinsertDeviceToken {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpClient,
    private readonly notificationAdapter: INotification
  ) {}

  public async perform (params: InsertDeviceTokenParams, token: string): Promise<void> {
    const deviceToken = await this.getToken()
    const httpResponse = await this.httpPostClient.request({
      method: 'POST',
      url: this.url,
      body: {
        accountId: params.accountId,
        deviceToken
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return
      case HttpStatusCode.unathorized: throw new UnathorizedError()
      case HttpStatusCode.badRequest: throw new BadRequest()
      default: throw new UnexpectedError()
    }
  }

  public async getToken (): Promise<string> {
    return await this.notificationAdapter.getToken()
  }
}
