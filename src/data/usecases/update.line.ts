import { HttpStatusCode } from '../../@types/http.response'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type IHttpClient } from '../protocols/http/http.post.client.protocol'
import { type UpdateLineParams, type IUpdateLine } from '../protocols/usecases/update.line.protocol'

export class UpdateLine implements IUpdateLine {
  constructor (
    private readonly url: string,
    private readonly HttpPutClient: IHttpClient
  ) {}

  public async perform (params: UpdateLineParams): Promise<void> {
    const httpResponse = await this.HttpPutClient.request({
      method: 'PUT',
      url: `${this.url}?workId=${params.workId}`,
      body: params.params,
      headers: {
        Authorization: `Bearer ${params.token}`
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
