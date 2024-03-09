import { type IHttpClient } from '../protocols/http/http.post.client.protocol'
import { type InsertKmParams, type IinsertKm } from '../protocols/usecases/insert.km.protocol'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { HttpStatusCode } from '../../@types/http.response'

export class InsertKm implements IinsertKm {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpClient
  ) {}

  public async perform (params: InsertKmParams, workId: string, accountId: string, token: string): Promise<void> {
    const httpResponse = await this.httpPostClient.request({
      method: 'POST',
      url: `${this.url}?workId=${workId}&accountId=${accountId}`,
      body: params,
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
