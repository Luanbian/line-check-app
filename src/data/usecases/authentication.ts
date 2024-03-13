import { HttpStatusCode } from '../../@types/http.response'
import { InvalidCredentialsError } from '../../core/exceptions/invalid.credentials.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type accountProps } from '../../domain/entities/account'
import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'
import { type IAuthentication, type authParamns } from '../protocols/authentication.protocol'

export class Authentication implements IAuthentication {
  constructor (
    private readonly url: string,
    private readonly HttpPostClient: IHttpClient
  ) {}

  async auth (params: authParamns): Promise<accountProps> {
    const httpResponse = await this.HttpPostClient.request({
      url: this.url,
      method: 'POST',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return { accessToken: httpResponse.body as string }
      case HttpStatusCode.badRequest: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
