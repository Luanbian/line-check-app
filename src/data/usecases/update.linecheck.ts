import { HttpStatusCode } from '../../@types/http.response'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'
import { type UpdateLineCheckParams, type IUpdateLineCheck } from '../protocols/update.linecheck.protocol'

export class UpdateLineCheck implements IUpdateLineCheck {
  constructor (
    private readonly url: string,
    private readonly HttpGetClient: IHttpClient
  ) {}

  public async perform (params: UpdateLineCheckParams): Promise<void> {
    const { workId, accountId, marker, token } = params
    const httpResponse = await this.HttpGetClient.request({
      url: `${this.url}?workId=${workId}&accountId=${accountId}&marker=${marker}`,
      method: 'PUT',
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
