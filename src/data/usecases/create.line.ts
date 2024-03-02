import { HttpStatusCode } from '../../@types/http.response'
import { BadRequest } from '../../core/exceptions/bad.request.error'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type IHttpClient } from '../protocols/http/http.post.client.protocol'
import { type CreateLineCheckParams, type ICreateLine } from '../protocols/usecases/create.line.protocol'

export class CreateLine implements ICreateLine {
  constructor (
    private readonly url: string,
    private readonly HttpPostClient: IHttpClient
  ) {}

  public async perform (params: CreateLineCheckParams, token: string): Promise<void> {
    const httpResponse = await this.HttpPostClient.request({
      method: 'POST',
      url: this.url,
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
