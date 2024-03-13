import { HttpStatusCode } from '../../@types/http.response'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'
import { type ServiceParams, type ICreateService } from '../protocols/create.service.protocol'

export class CreateService implements ICreateService {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpClient
  ) {}

  public async perform (data: ServiceParams, token: string): Promise<void> {
    const httpResponse = await this.httpPostClient.request({
      method: 'POST',
      url: this.url,
      body: data,
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
}
