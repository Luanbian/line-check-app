import { HttpStatusCode } from '../../@types/http.response'
import { InvalidCredentialsError } from '../../core/exceptions/invalid.credentials.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type accountProps } from '../../domain/entities/account'
import { type IHttpPostClient } from '../protocols/http/http.post.client.protocol'
import { type IAuthentication, type authParamns } from '../protocols/usecases/authentication.protocol'

export class Authentication implements IAuthentication {
  constructor (
    private readonly url: string,
    private readonly HttpPostClient: IHttpPostClient
  ) {}

  async auth (params: authParamns): Promise<accountProps> {
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as accountProps
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
