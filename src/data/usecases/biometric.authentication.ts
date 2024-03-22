import { HttpStatusCode } from '../../@types/http.response'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { InvalidCredentialsError } from '../../core/exceptions/invalid.credentials.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type IDeviceToken } from '../../infra/protocols/device.token.protocol'
import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'
import { type ILocalAuth } from '../../infra/protocols/local.auth.protocol'

export class BiometricAuth {
  constructor (
    private readonly localAuth: ILocalAuth,
    private readonly device: IDeviceToken,
    private readonly url: string,
    private readonly httpPostClient: IHttpClient
  ) {}

  public async perform (): Promise<any> {
    await this.auth()
    const deviceToken = this.device.getAndroidToken()
    await this.request(deviceToken)
  }

  private async auth (): Promise<void> {
    const auth = await this.localAuth.authenticate()
    if (!auth.isSuccess) throw new InvalidCredentialsError()
  }

  private async request (deviceToken: string): Promise<void> {
    const httpResponse = await this.httpPostClient.request({
      method: 'POST',
      url: this.url,
      body: { deviceToken }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return
      case HttpStatusCode.badRequest: throw new BadRequest()
      default: throw new UnexpectedError()
    }
  }
}
