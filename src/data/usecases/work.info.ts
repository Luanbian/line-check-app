import { HttpStatusCode } from '../../@types/http.response'
import { UnathorizedError } from '../../core/exceptions/unathorized.error'
import { UnexpectedError } from '../../core/exceptions/unexpected.error'
import { type workProps } from '../../domain/entities/work'
import { type IHttpClient } from '../../infra/protocols/http.post.client.protocol'
import { type IWorkInfo } from '../protocols/work.info.protocol'

export class WorkInfo implements IWorkInfo {
  constructor (
    private readonly url: string,
    private readonly HttpGetClient: IHttpClient
  ) {}

  public async perform (token: string): Promise<workProps[][]> {
    const httpResponse = await this.HttpGetClient.request({
      url: this.url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return [httpResponse.body as workProps[]]
      case HttpStatusCode.noContent: return [[] as workProps[]]
      case HttpStatusCode.unathorized: throw new UnathorizedError()
      default: throw new UnexpectedError()
    }
  }
}
