import { HttpStatusCode } from '../../@types/http.response'
import { InvalidCredentialsError } from '../../core/exceptions/invalid.credentials.error'
import { type IHttpPostClient } from '../protocols/http/http.post.client.protocol'
import { type authParamns } from '../protocols/usecases/authentication.protocol'

export class Authentication {
  constructor (
    private readonly url: string,
    private readonly HttpPostClient: IHttpPostClient
  ) {}

  async auth (params: authParamns): Promise<void> {
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unathorized :
        throw new InvalidCredentialsError()
    }
  }
}
